# *****
# This file was used to showcase working prototype connected to a server and website
# final file will only need to forward temp, humidity, ligh_condition, and soil_condition
# *****

import network
import urequests
import machine
import dht
import time

# Youre WiFi Credentials
SSID = "NameOfYourNetwork" # the name of your wifi network
PASSWORD = "Password" # password for the network

# Connect to WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

while not wlan.isconnected():
    print("Connecting to WiFi...")
    time.sleep(1)

print("Connected! IP Address:", wlan.ifconfig()[0])

# Define Sensors
dht_sensor = dht.DHT11(machine.Pin(16)) # Temp/Humidity Sensor
light_sensor = machine.ADC(26)  # Light Sensor (GP26 = ADC0)
soil_sensor = machine.ADC(27)  # Soil Moisture Sensor (GP27 = ADC1)

# TEMP estevan school Server URL
# Used to show working device for class presentation. Update to real server
SERVER_URL = "serverAddressHere"

# Function to send data
def send_data():
    try:
        # Read DHT11 sensor
        dht_sensor.measure()
        temp_c = dht_sensor.temperature()
        temp_f = (temp_c * 9 / 5) + 32
        humidity = dht_sensor.humidity()

        # Read Light Sensor
        raw_light = light_sensor.read_u16()
        voltage_light = (raw_light / 65535) * 3.3
        light_condition = "Dark" if voltage_light > 3.0 else "Light"

        # Read Soil Moisture Sensor
        raw_soil = soil_sensor.read_u16()
        voltage_soil = (raw_soil / 65535) * 3.0
        if voltage_soil <= 0.92:
            soil_condition = "Only Water"
        elif voltage_soil <= 1.2:
            soil_condition = "Wet Soil"
        elif voltage_soil <= 1.7:
            soil_condition = "Moist Soil"
        else:
            soil_condition = "Dry Soil"

        # Data to send
        # Final version will only use temp, humidity, ligh_condition, and soil_condition
        payload = {
            "temp_c": temp_c,
            "temp_f": temp_f,
            "humidity": humidity,
            "light_adc": raw_light,
            "light_voltage": voltage_light,
            "light_condition": light_condition,
            "soil_adc": raw_soil,
            "soil_voltage": voltage_soil,
            "soil_condition": soil_condition
        }

        # Send HTTP request
        response = urequests.post(SERVER_URL, json=payload)
        print("Server Response:", response.text)
        response.close()

    except Exception as e:
        print("Error sending data:", e)

# Loop to send data every 30 seconds
while True:
    send_data()
    time.sleep(30)  # Send data every 30 seconds


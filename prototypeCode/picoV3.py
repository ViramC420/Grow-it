# Added connection to DB via DigitalOcean
# Added PicoID
# added LED Blinking to indicate if connected to wifi
# added payload and timeStamp to printout

import network
import urequests
import machine
import dht
import time

# WiFi Credentials
SSID = "placeHolderSSID " # Your home wifi name
PASSWORD = "placeHolderPassword" # Your home wifi password

# Define the onboard LED
led = machine.Pin("LED", machine.Pin.OUT)

# Connect to WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)

while not wlan.isconnected():
    led.value(not led.value())  # Blink LED while connecting
    current_time = time.localtime()  # Get current time as a tuple
    timestamp = "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(*current_time)  # Format it
    print("Connecting to WiFi... ", timestamp)
    time.sleep(1)

led.value(1)  # Turn on LED once connected
current_time = time.localtime()
timestamp = "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(*current_time)
print("Connected! IP Address:", wlan.ifconfig()[0], " ", timestamp)

# Define Sensors
dht_sensor = dht.DHT11(machine.Pin(16))
light_sensor = machine.ADC(26)  # Light Sensor (GP26 = ADC0)
soil_sensor = machine.ADC(27)  # Soil Moisture Sensor (GP27 = ADC1)

# Unique ID for Pico
# Soph use "pico4"
# issa use "pico5"
device_id = "placeHolderPico#"  # change for each pico.(1,2,3...)                         
                            
# Update this to your DigitalOcean server IP
SERVER_URL = "http://128.199.0.224:5000/update_data"

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
        payload = {
            "device_id": device_id,
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

        # Print the payload to the console
        current_time = time.localtime()
        timestamp = "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(*current_time)
        print("Payload: ", payload, " ", timestamp)

        # Send HTTP request to Flask server
        response = urequests.post(SERVER_URL, json=payload)
        print("Server Response:", response.text, " ", timestamp)
        response.close()

    except Exception as e:
        current_time = time.localtime()
        timestamp = "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(*current_time)
        print("Error sending data:", e, " ", timestamp)

# Loop to send data every 10 seconds
while True:
    send_data()
    time.sleep(30)  # Send data every 30 seconds


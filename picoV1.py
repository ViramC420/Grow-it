from machine import Pin, ADC
import dht
import time

# Initialize LED on the built-in pin
led = Pin("LED", Pin.OUT)

# Initialize light sensor on GP15
light_sensor = Pin(15, Pin.IN)

# Initialize DHT11 sensor on GP14 
dht_pin = Pin(14, Pin.IN, Pin.PULL_UP)
sensor = dht.DHT11(dht_pin)

# Initialize soil moisture sensor on GP27 (ADC1)
soil_moisture = ADC(Pin(27))  # GP27 corresponds to ADC1

# Function to read soil moisture
def read_soil_moisture():
    raw_value = soil_moisture.read_u16()  # Read 16-bit ADC value (0 - 65535)
    voltage = raw_value * 3.3 / 65535  # Convert to voltage (0-3.3V)
    print(f"Raw ADC Value: {raw_value}, Voltage: {voltage:.2f}V")
    return raw_value

# Main loop
while True:
    # LED Blinking
    led.value(1)
    time.sleep(2)
    led.value(0)
    time.sleep(2)

    # Read light sensor
    light_status = light_sensor.value()
    if light_status == 1:
        print("Bright Light Detected!")
    else:
        print("Low Light Detected!")

    # Read DHT11 Sensor
    try:
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()
        print(f"Temperature: {temp}°C  Humidity: {hum}%")
    except OSError:
        print("Failed to read DHT11 sensor.")

    # Read soil moisture
    read_soil_moisture()

    # Delay before next iteration
    time.sleep(2)

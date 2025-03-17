import machine
import dht
import time

# Define the onboard LED
led = machine.Pin("LED", machine.Pin.OUT)

# Define the DHT11 sensor on GPIO 16 (TEMP/HUMIDITY)
dht_sensor = dht.DHT11(machine.Pin(16))

# Define the analog output pin for light sensor (GP26 = ADC0)
light_sensor_analog = machine.ADC(26)  # Reads 16-bit raw analog value

# Define the analog output pin for soil moisture sensor (GP27 = ADC1)
soil_sensor = machine.ADC(27)  # Reads 16-bit raw analog value

# Timing variables
led_on_duration = 10  # LED stays on for 10s
led_off_duration = 60  # LED stays off for 60s
update_interval = 10  # Update every 10s
elapsed_time = 0  # Track elapsed time

while True:
    # LED light will blink if connected to power
    if elapsed_time % (led_on_duration + led_off_duration) < led_on_duration:
        led.value(1)  # Turn LED ON
    else:
        led.value(0)  # Turn LED OFF

    # Read DHT11 sensor
    try:
        dht_sensor.measure()  # Read sensor
        temp_c = dht_sensor.temperature()  # Get temperature in Celsius
        temp_f = (temp_c * 9 / 5) + 32  # Convert to Fahrenheit
        hum = dht_sensor.humidity()  # Get humidity percentage
        print(f"Temperature: {temp_c}°C / {temp_f:.1f}°F, \nHumidity: {hum}%")
    except OSError as e:
        print(f"Failed to read DHT11 sensor: {e}")

    # Read light sensor (Analog)
    raw_light = light_sensor_analog.read_u16()  # 0 to 65535
    voltage_light = (raw_light / 65535) * 3.3  # Convert to voltage (0V to 3.3V)

    # Determine Bright/Dark Condition Based on Voltage
    light_condition = "Dark" if voltage_light > 3.0 else "Light"

    # Print light sensor readings
    print(f"Light Sensor -> Raw ADC: {raw_light}, Voltage: {voltage_light:.2f}V, Condition: {light_condition}")

    # Read soil moisture sensor (Analog)
    raw_soil = soil_sensor.read_u16()  # 0 to 65535
    voltage_soil = (raw_soil / 65535) * 3.0  # Convert to voltage (0V to 3.0V)

    # Determine Soil Moisture Condition
    if voltage_soil <= 0.92:
        soil_condition = "Only Water"
    elif voltage_soil <= 1.2:
        soil_condition = "Wet Soil"
    elif voltage_soil <= 1.7:
        soil_condition = "Moist Soil"
    else:
        soil_condition = "Dry Soil"

    # Print soil moisture sensor readings
    print(f"Soil Moisture -> Raw ADC: {raw_soil}, Voltage: {voltage_soil:.2f}V, Condition: {soil_condition}\n")

    # Wait for next update
    time.sleep(update_interval)
    elapsed_time += update_interval  # Increase time counter


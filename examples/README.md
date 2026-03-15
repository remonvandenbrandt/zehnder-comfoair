# Example configurations

This folder contains minimal example ESPHome configurations for different ESP boards and output options. Use these as a starting point and verify the board and GPIO pins for your hardware.

> [!WARNING] 
> Always check that the board and GPIO pins match your configuration!

Included examples:
- [esp8266](esp8266.yaml) — ESP8266 (NodeMCU v2) with software PWM output.
- [esp32](esp32.yaml) — ESP32 using the built-in DAC.
- [esp32_external_dac](esp32_external_dac.yaml) — ESP32 with an external GP8413 DAC (I²C).

Notes:
- These examples reference the package components [../components/zehnder.yaml](components/zehnder.yaml) and [../components/fan.yaml](components/fan.yaml).
- If using a MAX485 without automatic flow control, uncomment and configure the `modbus.flow_control_pin` in the example files.
- Substitute the pins and secrets (Wi‑Fi, API/OTA keys) as required by your setup.

For full project details and wiring, see the project root README: [../README.md](README.md).
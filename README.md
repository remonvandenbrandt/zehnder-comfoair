## ESPHome Zehnder ComfoAir E300/E400
ESPHome component for communication with the Zehnder ComfoAir E300/E400 heat recovering ventilation units.

### Setup 
The unit uses RS485 serial communication at 19200:8:EVEN:1. Connect using a twisted pair wired to the C3 port on the Zehnder unit.

The C3 connector is located at the top right of display. To access it, remove the cover surrounding the display by removing three torx screws. 
The pin-out is shown in the image below:

![C3 port pinout](docs/connector.png)

### Example of minimal configuration yaml
```yaml
substitutions:
  tx_pin: GPIO01
  rx_pin: GPIO03
  update_interval: 15s

packages:
  remote_package:
    url: https://github.com/CodedCactus/zehnder-comfoair
    ref: main
    files: [components/zehnder.yaml]
    refresh: 0s
    
logger:
  baud_rate: 0 # disable logger for hardware UART support
```

### Registry table

holding registers

| Adress | Name                                | Datatype | Unit  | Note                     |
|--------|-------------------------------------|----------|-------|--------------------------|
| 0x136  | Exhaust fan duty cycle              | U_WORD   | %*10  |                          |
| 0x137  | Supply fan duty cycle               | U_WORD   | %*10  |                          |
| 0x138  | Exhaust fan flow rate               | U_WORD   | m³/h  |                          |
| 0x139  | Supply fan flow rate                | U_WORD   | m³/h  |                          |
| 0x13A  | Exhaust fan speed                   | U_WORD   | RPM   |                          |
| 0x13B  | Supply fan speed                    | U_WORD   | RPM   |                          |
| 0x12C  | Outdoor air temperature             | S_WORD   | °C*10 |                          |
| 0x12D  | Pre-heater temperature              | S_WORD   | °C*10 |                          |
| 0x12F  | Supply air temperature              | S_WORD   | °C*10 |                          |
| 0x130  | Extract air temperature             | S_WORD   | °C*10 |                          |
| 0x131  | Exhaust air temperature             | S_WORD   | °C*10 |                          |
| 0x132  | Outdoor humidity                    | U_WORD   | %*10  |                          |
| 0x133  | Supply humidity                     | U_WORD   | %*10  |                          |
| 0x134  | Extract humidity                    | U_WORD   | %*10  |                          |
| 0x135  | Exhaust humidity                    | U_WORD   | %*10  |                          |
| 0x141  | Exhaust fan flow rate setpoint      | U_WORD   | m³/h  |                          | 
| 0x140  | Supply fan flow rate setpoint       | U_WORD   | m³/h  |                          |
| 0x148  | 0-10 V control setpoint             | U_WORD   | %     | 0:low;50:medium;100:high |
| 0x149  | RF control setpoint                 | U_WORD   | %     | 0:low;50:medium;100:high |
| 0x14A  | 3-way switch control setpoint       | U_WORD   | %     | 0:low;50:medium;100:high |
| 0x13D  | RF input voltage                    | U_WORD   | V*100 | steering signal (0-10V)  |
| 0x13F  | Pre-heater active                   | U_WORD   | -     | 0:off;1:on               |
| 0x152  | Pre-heater present*                 | U_WORD   | -     | 0:absent;1:present       |
| 0x151  | Fireplace mode*                     | U_WORD   | -     | 0:off;1:on               |
| 0x06E  | Firmware version                    | U_WORD   | -     | 20800 = 2.8.0            |

*Only available on later firmware versions (comfirmed on 2.8.0)
## ESPHome Zehnder ComfoAir E300/E400
ESPHome component for communication with the Zehnder ComfoAir E300/E400 heat recovering ventilation units using modbus RTU. This module allows for reading sensor states into Home-assistant.

### Setup 
The component uses modbus RTU serial communication over RS485 to interface with the ventilation unit. The serial communication is available on the C3 connector. The serial configuration is shown in the following table:

| Baud rate | Word length | Parity | Stop bits |
|-----------|-------------|--------|-----------|
| 19200     | 8           | EVEN   | 1         |

The C3 connector is located at the top right of display. To access it, remove the cover surrounding the display by removing three Torx screws. 
The pin-out is shown in the image below:

![C3 port pin-out](docs/connector.png)

| Connector | Description                                             |
|-----------|---------------------------------------------------------|
| C1        | Analog (0-10 V) control input                           |
| C2        | Bathroom switch                                         |
| C3        | RS485 serial interface                                  |
| C4        | Malfunction indicator (5V when malfunction is detected) |

### Hardware
The example hardware is based on a nodeMCU V2 and a MAX485 module that converts the RS485 signal to UART. 

Since the RS485 connection is half-duplex, it cannot send and receive data at the same time, unlike UART. To overcome this issue, the module uses flow control to determine if it should be sending or receiving data. Two different types of module are available, with and without automatic flow control.

| Without automatic flow control                    | With automatic flow control                    |
| --------------------------------------------------|------------------------------------------------|
| <img src="docs/max485_no_flow.jpg" width="320" /> | <img src="docs/max485_flow.jpg" width="290" /> |

Note that the pin-out is different. The module with automatic flow control has input pins labeled TDX and RDX while the module without automatic flow control has pins labeled DI, RO, RE and DE.

Both modules can be used in this project, the only difference being the availability of the module, and the requirement for an additional free pin.

In order to connect the MAX485 module to the nodeMCU the following mapping can be used. 

| nodeMCU | MAX485 | MAX485 (w/o flow control) |
|---------|--------|---------------------------|
| GPI01   | TDX    | DI (Driver Input)         |
| GPI03   | RDX    | RO (Receiver Output)      |
| GPIO5   | -      | RE (Receiver Enable)      |
| GPIO5   | -      | DE (Driver Enable)        |

Next, connect the VCC and GND pins. Finally, the A+ and B- ports of the MAX485 module should be connected to the A+ and B- ports on the C3 connector using a twisted pair. 

### Example of minimal configuration yaml
```yaml
substitutions:
  tx_pin: GPIO01
  rx_pin: GPIO03
  update_interval: 15s

# modbus: # uncomment for MAX485 chip without automatic flow control
#   flow_control_pin: GPIO05

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
The following data fields have been identified from the holding registers. Currently, all registers are read-only.

| Address | Name                                | Datatype | Unit | Scale | Note                                                 |
|-------- |-------------------------------------|----------|------|-------|------------------------------------------------------|
| 0x065   | Device Status                       | U_WORD   | -    | -     | 0:Fault; 2:Self-test; 10:Normal; 42:Maintenance Mode |
| 0x06E   | Firmware version                    | U_WORD   | -    | -     | 20800 = 2.8.0                                        |
| 0x06F   | Orientation                         | U_WORD   | -    | -     | 0:right; 1:left                                      |
| 0x136   | Exhaust fan duty cycle              | U_WORD   | %    | 10    |                                                      |
| 0x137   | Supply fan duty cycle               | U_WORD   | %    | 10    |                                                      |
| 0x138   | Exhaust fan flow rate               | U_WORD   | m³/h | 1     |                                                      |
| 0x139   | Supply fan flow rate                | U_WORD   | m³/h | 1     |                                                      |
| 0x13A   | Exhaust fan speed                   | U_WORD   | RPM  | 1     |                                                      |
| 0x13B   | Supply fan speed                    | U_WORD   | RPM  | 1     |                                                      |
| 0x12C   | Outdoor air temperature             | S_WORD   | °C   | 10    |                                                      |
| 0x12D   | Pre-heater temperature              | S_WORD   | °C   | 10    |                                                      |
| 0x12F   | Supply air temperature              | S_WORD   | °C   | 10    |                                                      |
| 0x130   | Extract air temperature             | S_WORD   | °C   | 10    |                                                      |
| 0x131   | Exhaust air temperature             | S_WORD   | °C   | 10    |                                                      |
| 0x132   | Outdoor humidity                    | U_WORD   | %    | 10    |                                                      |
| 0x133   | Supply humidity                     | U_WORD   | %    | 10    |                                                      |
| 0x134   | Extract humidity                    | U_WORD   | %    | 10    |                                                      |
| 0x135   | Exhaust humidity                    | U_WORD   | %    | 10    |                                                      |
| 0x141   | Exhaust fan flow rate setpoint      | U_WORD   | m³/h | 1     |                                                      | 
| 0x140   | Supply fan flow rate setpoint       | U_WORD   | m³/h | 1     |                                                      |
| 0x145   | Bypass motor active                 | U_WORD   | -    | 1     | 0:off;1:one on;2:both on                             |
| 0x146   | Bypass setpoint                     | U_WORD   | %    | 1     | 0:closed;100:fully open                              |
| 0x147   | Bypass position                     | U_WORD   | %    | 1     | 0:closed;100:fully open                              |
| 0x148   | Analog (0-10 V) control setpoint    | U_WORD   | %    | 1     | 0:low;50:medium;100:high                             |
| 0x149   | RF control setpoint                 | U_WORD   | %    | 1     | 0:low;50:medium;100:high                             |
| 0x14A   | 3-way switch control setpoint       | U_WORD   | %    | 1     | 0:low;50:medium;100:high                             |
| 0x14B   | Bathroom switch control setpoint    | U_WORD   | %    | 1     | 0:low;50:medium;100:high                             |
| 0x13C   | Analog (0-10 V) input voltage       | U_WORD   | V    | 100   | steering signal (0-10V)                              |
| 0x13D   | RF input voltage                    | U_WORD   | V    | 100   | steering signal (0-10V)                              |
| 0x13E   | RF input enabled                    | U_WORD   | -    | -     | 0:off;1:on                                           |
| 0x13F   | Pre-heater active                   | U_WORD   | -    | -     | 0:off;1:on                                           |
| 0x152   | Pre-heater present*                 | U_WORD   | -    | -     | 0:absent;1:present                                   |
| 0x151   | Fireplace mode*                     | U_WORD   | -    | -     | 0:off;1:on                                           |

*Only available on later firmware versions (confirmed on 2.8.0)
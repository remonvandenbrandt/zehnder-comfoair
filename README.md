## ESPHome Zehnder Comfoair E300/E400

ESPHome component for reading the Zehnder Comfoair E330/E400 heat recovering ventilation units.

### Example of minimal configuration yaml
```yaml
packages:
  remote_package:
    url: https://github.com/remonvandenbrandt/zehnder-comfoair
    ref: main
    files: [components/zehnder.yaml]
    refresh: 0s
    
logger:
  level: VERBOSE
  baud_rate: 0 # disable logger for hardware UART support

uart:
  id: uart_modbus
  tx_pin: GPIO01
  rx_pin: GPIO03
  baud_rate: 19200
  data_bits: 8
  parity: EVEN
  stop_bits: 1

modbus:
  uart_id: uart_modbus
  id: modbus1

modbus_controller:
- id: modbus_device
  address: 0x1   ## address of the Modbus slave device on the bus
  modbus_id: modbus1
  setup_priority: -10
  update_interval: 5s
```

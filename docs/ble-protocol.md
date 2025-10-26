# BLE Protocol

## Service UUID
`4fafc201-1fb5-459e-8fcc-c5c9c331914b`

## Characteristic UUID
`beb5483e-36e1-4688-b7f5-ea07361b26a8`

## Data Format

The ESP32 sends sensor data packets via BLE notifications. Each packet is JSON-encoded:

```json
{
  "t": 1705318200000,
  "g": [47.123456, 8.654321, 2100.5],
  "a": [0.5, -0.2, 9.8],
  "w": [0.1, 0.05, -0.3],
  "m": [20.5, -5.3, 45.2],
  "p": 101325,
  "temp": -5.2
}
```

**Fields:**
- `t`: Timestamp (Unix milliseconds)
- `g`: GPS [latitude, longitude, altitude]
- `a`: Accelerometer [x, y, z] in m/s²
- `w`: Gyroscope [x, y, z] in rad/s
- `m`: Magnetometer [x, y, z] in μT
- `p`: Pressure in Pa
- `temp`: Temperature in °C

## Transmission Rate

- GPS: 10 Hz
- IMU: 100 Hz (may be downsampled to 50 Hz for BLE bandwidth)
- Magnetometer: 10 Hz
- Barometer: 1 Hz

## Connection Flow

1. Mobile app scans for devices with name prefix "SkiTracker"
2. Connect to device
3. Discover services and characteristics
4. Subscribe to sensor data characteristic
5. Receive notifications during run
6. Disconnect after run completes

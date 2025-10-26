# MATLAB Processing JSON Contract

This document defines the JSON data contract between the backend system and the MATLAB processor.

## Input Format

The MATLAB processor receives a JSON file with the following structure:

```json
{
  "runId": "string (UUID)",
  "startTime": "ISO 8601 timestamp",
  "endTime": "ISO 8601 timestamp (optional)",
  "sensorData": [
    {
      "timestamp": "number (Unix milliseconds)",
      "lat": "number (degrees)",
      "lon": "number (degrees)",
      "alt": "number (meters)",
      "gpsAccuracy": "number (meters)",
      "accelX": "number (m/s²)",
      "accelY": "number (m/s²)",
      "accelZ": "number (m/s²)",
      "gyroX": "number (rad/s)",
      "gyroY": "number (rad/s)",
      "gyroZ": "number (rad/s)",
      "magX": "number (μT)",
      "magY": "number (μT)",
      "magZ": "number (μT)",
      "pressure": "number (Pa)",
      "temperature": "number (°C)"
    }
  ],
  "metadata": {
    "resort": "string",
    "runType": "slalom | giant-slalom",
    "deviceId": "string"
  }
}
```

## Output Format

The MATLAB processor must output a JSON file with the following structure:

```json
{
  "runId": "string (same as input)",
  "processingTime": "ISO 8601 timestamp",

  "processedData": [
    {
      "timestamp": "number (Unix milliseconds)",
      "position": {
        "x": "number (meters - local coordinate)",
        "y": "number (meters - local coordinate)",
        "z": "number (meters - altitude)",
        "lat": "number (degrees - original GPS)",
        "lon": "number (degrees - original GPS)"
      },
      "velocity": {
        "vx": "number (m/s)",
        "vy": "number (m/s)",
        "vz": "number (m/s)",
        "speed": "number (m/s - total speed)"
      },
      "acceleration": {
        "ax": "number (m/s² - body frame)",
        "ay": "number (m/s²)",
        "az": "number (m/s²)",
        "gForce": "number (g - lateral G-force)"
      },
      "orientation": {
        "roll": "number (degrees)",
        "pitch": "number (degrees)",
        "yaw": "number (degrees - heading)"
      },
      "angularVelocity": {
        "wx": "number (rad/s - optional)",
        "wy": "number (rad/s - optional)",
        "wz": "number (rad/s - optional)"
      }
    }
  ],

  "path3D": [
    {
      "x": "number (meters)",
      "y": "number (meters)",
      "z": "number (meters - altitude)",
      "timestamp": "number (Unix milliseconds)"
    }
  ],

  "turns": [
    {
      "turnNumber": "integer",
      "startTime": "number (Unix milliseconds)",
      "endTime": "number (Unix milliseconds)",
      "radius": "number (meters)",
      "maxGForce": "number (g)",
      "avgSpeed": "number (m/s)",
      "rollAngle": "number (degrees)",
      "circleCenter": {
        "x": "number (meters)",
        "y": "number (meters)"
      }
    }
  ],

  "metrics": {
    "totalDistance": "number (meters)",
    "totalTime": "number (seconds)",
    "avgSpeed": "number (m/s)",
    "maxSpeed": "number (m/s)",
    "turnCount": "integer"
  },

  "terrain": [
    {
      "x": "number (meters)",
      "y": "number (meters)",
      "z": "number (meters)"
    }
  ]
}
```

## Notes

**Input:**
- All sensor fields are optional (sensors may fail or provide no data)
- Timestamp is in Unix milliseconds (JavaScript `Date.now()` format)
- GPS accuracy indicates the uncertainty in meters
- Input data rate: typically 10-100 Hz depending on sensor

**Output:**
- **`processedData`**: Full time-series at same rate as input (e.g., 25 Hz for 2 min run = ~3,000 data points)
  - Contains ALL processed sensor data after Kalman filtering
  - Position in both local coordinates (x, y, z) AND original GPS (lat, lon)
  - Velocity calculated from sensor fusion
  - Acceleration filtered from IMU
  - Orientation from sensor fusion (roll, pitch, yaw)
  - This is the primary output for detailed analysis and visualization

- **`path3D`**: Simplified 3D path (can be downsampled from `processedData`)
  - Optional: Can be same as processedData positions or downsampled for performance
  - Used for basic 3D visualization

- **`turns`**: Turn-by-turn analysis
  - Detected from roll angle and G-forces in `processedData`
  - Each turn includes radius from circle fitting
  - Ordered by turnNumber

- **`metrics`**: Overall run statistics
  - Calculated from `processedData`

- **`terrain`**: Optional terrain surface reconstruction
  - Can be omitted if not calculated

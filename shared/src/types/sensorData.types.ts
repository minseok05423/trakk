export interface SensorDataPoint {
  timestamp: number; // Unix milliseconds

  // GPS
  lat?: number;
  lon?: number;
  alt?: number;
  gpsAccuracy?: number;

  // IMU - Accelerometer
  accelX?: number;
  accelY?: number;
  accelZ?: number;

  // IMU - Gyroscope
  gyroX?: number;
  gyroY?: number;
  gyroZ?: number;

  // Magnetometer
  magX?: number;
  magY?: number;
  magZ?: number;

  // Barometer
  pressure?: number;
  temperature?: number;
}

export interface RawSensorData {
  runId?: string;
  startTime: string; // ISO timestamp
  endTime?: string;
  sensorData: SensorDataPoint[];
  metadata?: {
    resort?: string;
    runType?: 'slalom' | 'giant-slalom';
    deviceId?: string;
  };
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

// Full processed sensor data point (after Kalman filtering)
export interface ProcessedDataPoint {
  timestamp: number; // Unix milliseconds

  // Position (corrected via sensor fusion)
  position: {
    x: number;      // meters (local coordinate system)
    y: number;      // meters
    z: number;      // meters (altitude)
    lat: number;    // degrees (original GPS)
    lon: number;    // degrees (original GPS)
  };

  // Velocity (calculated from position + IMU)
  velocity: {
    vx: number;     // m/s
    vy: number;     // m/s
    vz: number;     // m/s
    speed: number;  // m/s (total speed)
  };

  // Acceleration (filtered from IMU)
  acceleration: {
    ax: number;     // m/s² (body frame)
    ay: number;     // m/s²
    az: number;     // m/s²
    gForce: number; // g (lateral G-force)
  };

  // Orientation (from sensor fusion)
  orientation: {
    roll: number;   // degrees
    pitch: number;  // degrees
    yaw: number;    // degrees (heading)
  };

  // Angular velocity (filtered from gyro)
  angularVelocity?: {
    wx: number;     // rad/s
    wy: number;     // rad/s
    wz: number;     // rad/s
  };
}

export interface Turn {
  turnNumber: number;
  startTime: number;
  endTime: number;
  radius: number;
  maxGForce: number;
  avgSpeed: number;
  rollAngle: number;
  circleCenter?: { x: number; y: number };
}

export interface RunMetrics {
  totalDistance: number;
  totalTime: number;
  avgSpeed: number;
  maxSpeed: number;
  turnCount: number;
}

export interface ProcessedRun {
  runId: string;
  processingTime: string;

  // Full time-series data (all processed sensor readings at original rate)
  processedData: ProcessedDataPoint[];

  // Simplified 3D path for visualization (can be downsampled)
  path3D: Point3D[];

  // Turn-by-turn analysis
  turns: Turn[];

  // Overall metrics
  metrics: RunMetrics;

  // Optional terrain surface reconstruction
  terrain?: Point3D[];
}

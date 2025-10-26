#!/usr/bin/env node
// Generate test sensor data for development

const fs = require('fs');
const path = require('path');

function generateTestRun(runNumber) {
  const startTime = new Date('2025-01-15T10:00:00Z');
  const duration = 120; // 2 minutes
  const sampleRate = 10; // Hz for GPS/IMU downsampled

  const sensorData = [];

  for (let i = 0; i < duration * sampleRate; i++) {
    const t = i / sampleRate;
    const timestamp = startTime.getTime() + (t * 1000);

    // Simulate skiing down a slope with turns
    const turnFreq = 0.1; // One turn every ~10 seconds
    const x = t * 10; // Moving forward ~10 m/s
    const y = Math.sin(t * turnFreq * 2 * Math.PI) * 20; // Side-to-side motion
    const z = 2100 - (t * 3); // Descending ~3 m/s

    // Convert back to lat/lon (approximate)
    const lat = 47.123456 + (y / 111320);
    const lon = 8.654321 + (x / (111320 * Math.cos(47.123456 * Math.PI / 180)));

    sensorData.push({
      timestamp,
      lat,
      lon,
      alt: z,
      gpsAccuracy: 5 + Math.random() * 3,
      accelX: Math.random() * 2 - 1,
      accelY: Math.random() * 2 - 1,
      accelZ: 9.8 + Math.random() * 2,
      gyroX: Math.random() * 0.5 - 0.25,
      gyroY: Math.random() * 0.5 - 0.25,
      gyroZ: Math.random() * 0.5 - 0.25,
      magX: 20 + Math.random() * 5,
      magY: -5 + Math.random() * 5,
      magZ: 45 + Math.random() * 5,
      pressure: 101325 - (z - 2100) * 12,
      temperature: -5 + Math.random() * 2
    });
  }

  return {
    runId: `test-run-${runNumber.toString().padStart(3, '0')}`,
    startTime: startTime.toISOString(),
    endTime: new Date(startTime.getTime() + duration * 1000).toISOString(),
    sensorData,
    metadata: {
      resort: "Test Resort",
      runType: Math.random() > 0.5 ? "slalom" : "giant-slalom",
      deviceId: "ESP32-TEST"
    }
  };
}

// Generate 3 test runs
console.log('Generating test data...');

for (let i = 1; i <= 3; i++) {
  const testRun = generateTestRun(i);
  const filename = `test-run-${i}.json`;
  const filepath = path.join(__dirname, '..', 'matlab-processor', 'test_data', filename);

  fs.writeFileSync(filepath, JSON.stringify(testRun, null, 2));
  console.log(`✅ Generated ${filename}`);
}

console.log('Test data generation complete!');

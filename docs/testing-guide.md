# Testing Guide

## Backend Testing

### Local Setup

1. **Start PostgreSQL and Redis**
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Run migrations**
   ```bash
   npm run migrate
   ```

4. **Start server and worker**
   ```bash
   # Terminal 1
   npm run dev

   # Terminal 2
   npm run worker
   ```

### API Testing with Postman

1. **Health check**
   ```
   GET http://localhost:3000/api/health
   ```

2. **Request upload URL**
   ```
   POST http://localhost:3000/api/runs/upload
   Body: {
     "userId": "test-user",
     "metadata": {
       "resort": "Test Resort",
       "runType": "slalom"
     }
   }
   ```

3. **Upload data to S3**
   - Use the `uploadUrl` from step 2
   - PUT request with JSON body

4. **Fetch run**
   ```
   GET http://localhost:3000/api/runs/:runId
   ```

## Mobile App Testing

### Prerequisites
- Expo Go app installed on phone
- Backend running locally or deployed

### Steps

1. **Install dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Update API URL**
   - Edit `src/services/APIService.ts`
   - Change `API_URL` to your backend URL

3. **Start Expo**
   ```bash
   npm start
   ```

4. **Scan QR code** with Expo Go app

### BLE Testing

**Note:** BLE doesn't work on simulators, requires physical device.

1. Ensure ESP32 hardware is powered on
2. Navigate to "Live Run" screen
3. Tap "Scan for Devices"
4. Connect to your device
5. Start recording

## MATLAB Processor Testing

### Local Testing

1. **Build Docker image**
   ```bash
   cd matlab-processor
   ./scripts/build.sh
   ```

2. **Run with test data**
   ```bash
   ./scripts/test_local.sh
   ```

3. **Verify output in S3**

### Integration Testing

1. Upload run data via mobile app
2. Check processing queue in Redis
3. Verify worker picks up job
4. Check ECS task starts (AWS Console)
5. Verify processed results in S3
6. Verify database updated
7. Fetch run from API - should show processed data

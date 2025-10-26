# Deployment Guide

## Backend Deployment (Railway/Render)

### Prerequisites
- Railway or Render account
- GitHub repository connected

### Steps

1. **Create PostgreSQL database**
   - Add PostgreSQL addon in Railway/Render dashboard
   - Note the `DATABASE_URL`

2. **Create Redis instance**
   - Add Redis addon
   - Note `REDIS_HOST` and `REDIS_PORT`

3. **Set environment variables**
   ```
   DATABASE_URL=<from step 1>
   REDIS_HOST=<from step 2>
   REDIS_PORT=<from step 2>
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=<your key>
   AWS_SECRET_ACCESS_KEY=<your secret>
   S3_BUCKET_RAW_DATA=ski-tracker-raw-data
   S3_BUCKET_PROCESSED=ski-tracker-processed
   ```

4. **Deploy**
   - Connect GitHub repo
   - Set build command: `cd backend && npm install && npm run build`
   - Set start command: `cd backend && npm start`

5. **Deploy worker** (separate service)
   - Same repo, different start command
   - Start command: `cd backend && npm run worker:start`

## AWS S3 Setup

1. Create two S3 buckets:
   - `ski-tracker-raw-data`
   - `ski-tracker-processed`

2. Configure CORS on buckets (for pre-signed URLs)

3. Create IAM user with S3 access
   - Note `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

## MATLAB Processor Deployment (AWS Fargate)

### Prerequisites
- Compiled MATLAB executable
- AWS CLI configured

### Steps

1. **Create ECR repository**
   ```bash
   aws ecr create-repository --repository-name matlab-processor
   ```

2. **Build and push Docker image**
   ```bash
   cd matlab-processor
   docker build -t matlab-processor .
   docker tag matlab-processor:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/matlab-processor:latest
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/matlab-processor:latest
   ```

3. **Create ECS cluster**
   - Use AWS Console or CLI
   - Choose Fargate launch type

4. **Create task definition**
   - Container image: ECR image URI
   - Memory: 8 GB
   - CPU: 4 vCPU
   - Environment variables template (will be overridden at runtime)

5. **Update backend** to trigger Fargate tasks
   - Set `ECS_CLUSTER_NAME` and `ECS_TASK_DEFINITION` in backend env vars

## Mobile App Deployment

### iOS (TestFlight)
1. Configure app in App Store Connect
2. Build with EAS: `eas build --platform ios`
3. Submit to TestFlight

### Android (Google Play)
1. Configure app in Google Play Console
2. Build with EAS: `eas build --platform android`
3. Upload to Google Play

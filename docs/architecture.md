# System Architecture

## Overview

The Ski Racing Tracker is a full-stack application that captures, processes, and visualizes ski racing performance data.

## Components

### 1. Hardware Layer
- ESP32-based sensor system
- GPS, IMU, magnetometer, barometer sensors
- BLE communication to mobile device
- Battery-powered (5-9 hour operation)

### 2. Mobile Application
- **Technology**: React Native (Expo)
- **Features**:
  - BLE connection to hardware
  - Real-time data capture
  - Local data buffering (SQLite)
  - Cloud upload after run
  - 2D/3D visualization
  - Turn-by-turn analysis

### 3. Backend API
- **Technology**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Features**:
  - REST API for data upload/retrieval
  - S3 pre-signed URL generation
  - Job queue management (Bull + Redis)
  - Processing trigger for MATLAB

### 4. MATLAB Processing
- **Technology**: MATLAB Runtime in Docker container
- **Deployment**: AWS Fargate
- **Features**:
  - Sensor fusion (GPS + IMU + Mag + Barometer)
  - Turn detection
  - Circle fitting for GPS correction
  - 3D path reconstruction

## Data Flow

```
ESP32 → BLE → Mobile App → S3 (raw data)
                    ↓
              Processing Queue
                    ↓
           MATLAB (AWS Fargate)
                    ↓
              S3 (processed) + PostgreSQL
                    ↓
              Mobile App (visualization)
```

## Technology Stack

- **Frontend**: React Native, TypeScript, Zustand, React Navigation
- **Backend**: Node.js, Express, TypeScript, Prisma
- **Database**: PostgreSQL, Redis
- **Storage**: AWS S3
- **Processing**: MATLAB Runtime, AWS Fargate
- **Deployment**: Railway/Render (backend), AWS (storage + processing)

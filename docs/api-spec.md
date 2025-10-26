# API Specification

Base URL: `https://api.skitracker.com/api` (update with actual URL)

## Endpoints

### POST /runs/upload

Request pre-signed S3 URL for uploading run data.

**Request:**
```json
{
  "userId": "string",
  "metadata": {
    "resort": "string (optional)",
    "runType": "slalom | giant-slalom (optional)"
  }
}
```

**Response:**
```json
{
  "runId": "uuid",
  "uploadUrl": "string (S3 pre-signed URL, valid 15 min)"
}
```

### POST /runs/:runId/process

Trigger MATLAB processing for a run.

**Response:**
```json
{
  "message": "Processing started",
  "runId": "uuid"
}
```

### GET /runs/:runId

Get run details including processed data.

**Response:**
```json
{
  "id": "uuid",
  "userId": "string",
  "uploadTime": "ISO timestamp",
  "processingStatus": "uploaded | processing | completed | failed",
  "duration": 45.3,
  "avgSpeed": 9.9,
  "maxSpeed": 22.1,
  "turnCount": 28,
  "processedData": {
    "path3D": [...],
    "turns": [...],
    "metrics": {...}
  },
  "turnMetrics": [...]
}
```

### GET /runs?userId=xxx

List all runs for a user.

**Response:**
```json
[
  {
    "id": "uuid",
    "uploadTime": "ISO timestamp",
    "processingStatus": "string",
    "avgSpeed": 9.9,
    ...
  }
]
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "ISO timestamp"
}
```

import { ProcessedRun, Turn } from './processedRun.types';

export interface UploadUrlRequest {
  userId: string;
  metadata?: {
    resort?: string;
    runType?: 'slalom' | 'giant-slalom';
  };
}

export interface UploadUrlResponse {
  runId: string;
  uploadUrl: string;
}

export interface RunResponse {
  id: string;
  userId: string;
  uploadTime: string;
  processingStatus: 'uploaded' | 'processing' | 'completed' | 'failed';
  rawDataS3Key: string;
  processedDataS3Key?: string;
  duration?: number;
  resort?: string;
  runType?: string;
  totalDistance?: number;
  avgSpeed?: number;
  maxSpeed?: number;
  turnCount?: number;
  processedData?: ProcessedRun;
  turnMetrics?: Turn[];
}

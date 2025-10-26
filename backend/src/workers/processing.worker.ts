import { processingQueue } from '../queues/processing.queue';
import { prisma } from '../services/database.service';
import { downloadFromS3, uploadToS3 } from '../services/s3.service';
import { processMatlabData } from '../services/matlab.service';

processingQueue.process('process-run', async (job) => {
  const { runId, s3Key } = job.data;

  console.log(`Processing run ${runId}...`);

  try {
    // Update status to processing
    await prisma.run.update({
      where: { id: runId },
      data: { processingStatus: 'processing' }
    });

    // Download raw data from S3
    const rawData = await downloadFromS3(
      process.env.S3_BUCKET_RAW_DATA!,
      s3Key
    );

    // Process with MATLAB
    const processedData = await processMatlabData(rawData);

    // Upload results to S3
    const processedKey = `processed/${runId}.json`;
    await uploadToS3(
      process.env.S3_BUCKET_PROCESSED!,
      processedKey,
      processedData
    );

    // Save turn metrics to database
    if (processedData.turns && processedData.turns.length > 0) {
      await prisma.turnMetric.createMany({
        data: processedData.turns.map((turn: any) => ({
          runId,
          turnNumber: turn.turnNumber,
          startTime: new Date(turn.startTime),
          endTime: new Date(turn.endTime),
          radius: turn.radius,
          maxGForce: turn.maxGForce,
          avgSpeed: turn.avgSpeed,
          rollAngle: turn.rollAngle,
          circleCenterX: turn.circleCenter?.x,
          circleCenterY: turn.circleCenter?.y
        }))
      });
    }

    // Update run with metrics and status
    await prisma.run.update({
      where: { id: runId },
      data: {
        processingStatus: 'completed',
        processedDataS3Key: processedKey,
        duration: processedData.metrics.totalTime,
        totalDistance: processedData.metrics.totalDistance,
        avgSpeed: processedData.metrics.avgSpeed,
        maxSpeed: processedData.metrics.maxSpeed,
        turnCount: processedData.metrics.turnCount
      }
    });

    console.log(`Run ${runId} processed successfully`);
    return { success: true, runId };

  } catch (error) {
    console.error(`Failed to process run ${runId}:`, error);

    await prisma.run.update({
      where: { id: runId },
      data: { processingStatus: 'failed' }
    });

    throw error;
  }
});

console.log('Processing worker started');

import Bull from 'bull';

export const processingQueue = new Bull('matlab-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
});

// Monitor queue events
processingQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

processingQueue.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function generateUploadUrl(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_RAW_DATA,
    Key: key,
    ContentType: 'application/json'
  });

  return getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 min
}

export async function uploadToS3(bucket: string, key: string, data: any) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json'
  });

  await s3Client.send(command);
}

export async function downloadFromS3(bucket: string, key: string): Promise<any> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });

  const response = await s3Client.send(command);
  const str = await response.Body?.transformToString();
  return JSON.parse(str || '{}');
}

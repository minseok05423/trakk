#!/bin/bash
set -e

echo "🚀 MATLAB Processor starting..."
echo "Input S3 Key: ${INPUT_S3_KEY}"
echo "Output S3 Key: ${OUTPUT_S3_KEY}"

# Download input from S3
echo "📥 Downloading input data..."
aws s3 cp "s3://${S3_BUCKET_RAW_DATA}/${INPUT_S3_KEY}" /tmp/input.json

# Run MATLAB executable
echo "🔬 Processing data with MATLAB..."
/app/matlab_processor /tmp/input.json /tmp/output.json

# Upload output to S3
echo "📤 Uploading results..."
aws s3 cp /tmp/output.json "s3://${S3_BUCKET_PROCESSED}/${OUTPUT_S3_KEY}"

echo "✅ Processing complete!"

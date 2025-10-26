#!/bin/bash
# Test MATLAB processor locally

echo "Testing MATLAB processor locally..."

# Create test output directory
mkdir -p test_output

# Run Docker container with test data
docker run \
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  -e S3_BUCKET_RAW_DATA=ski-tracker-raw-data \
  -e S3_BUCKET_PROCESSED=ski-tracker-processed \
  -e INPUT_S3_KEY=test/sample-run-1.json \
  -e OUTPUT_S3_KEY=test/output-1.json \
  matlab-processor:latest

echo "✅ Test complete. Check S3 for results."

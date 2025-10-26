#!/bin/bash
# Build script for MATLAB processor Docker image

echo "Building MATLAB processor Docker image..."

# Check if compiled executable exists
if [ ! -f "compiled/matlab_processor" ]; then
    echo "❌ Error: Compiled MATLAB executable not found in compiled/"
    echo "Please compile your MATLAB code first using MATLAB Compiler"
    exit 1
fi

# Build Docker image
docker build -t matlab-processor:latest .

echo "✅ Docker image built successfully"
echo "Tag and push to ECR:"
echo "  docker tag matlab-processor:latest <account-id>.dkr.ecr.<region>.amazonaws.com/matlab-processor:latest"
echo "  docker push <account-id>.dkr.ecr.<region>.amazonaws.com/matlab-processor:latest"

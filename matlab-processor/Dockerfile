FROM mathworks/matlab-runtime:r2024a

WORKDIR /app

# Copy compiled MATLAB executable
COPY compiled/matlab_processor /app/matlab_processor
COPY scripts/run_matlab.sh /app/run_matlab.sh

RUN chmod +x /app/matlab_processor /app/run_matlab.sh

# Install AWS CLI
RUN apt-get update && apt-get install -y \
    python3-pip \
    curl \
    unzip \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws \
    && apt-get clean

# Install jq for JSON parsing
RUN apt-get install -y jq

CMD ["/app/run_matlab.sh"]

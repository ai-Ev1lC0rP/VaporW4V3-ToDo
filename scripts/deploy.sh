#!/bin/bash

# Make script executable with: chmod +x scripts/deploy.sh

# Stop running containers
echo "Stopping running containers..."
docker-compose down

# Build and start containers
echo "Building and starting containers..."
docker-compose up --build -d

# Check container health
echo "Checking container health..."
sleep 10
docker-compose ps

echo "Deployment complete! Application is running at http://localhost"

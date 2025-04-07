#!/bin/bash

app="cadastral_container"

echo "🚨 Stopping and removing previous containers, images, and volumes..."
docker-compose -p ${app} down --rmi all --volumes --remove-orphans

echo "🗑️ Aggressively cleaning Docker storage..."

# Remove ALL unused Docker resources (containers, images, networks, volumes)
docker system prune -af --volumes

# Clean Docker build cache thoroughly (no-cache for stubborn layers)
docker builder prune -af --keep-storage 512m

# Optional: If you have dangling images (uncached intermediates), remove them
docker image prune -af

# Check Docker disk usage after cleaning
docker system df

echo "🚀 Rebuilding and recreating ${app}..."
docker-compose -p ${app} up --build --force-recreate -d -V

echo "✅ Docker cleanup and rebuild completed."
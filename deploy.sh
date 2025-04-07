#!/bin/bash

# Variables
LOCAL_DIR="."
REMOTE_USER="operador"
REMOTE_HOST="172.31.113.151"
REMOTE_DIR="/home/operador/ModulesDev/v3"
START_SCRIPT="start.sh"

# Sync files with rsync, excluding specific folders
rsync -avz --delete \
  --exclude "node_modules" \
  --exclude ".git" \
  --exclude "Backend" \
  --exclude "Frontend" \
  --exclude "frontend" \
  --exclude ".next" \
  --exclude ".vscode" \
  --exclude "deploy.sh" \
  $LOCAL_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Connect to the server and execute the script
ssh $REMOTE_USER@$REMOTE_HOST << EOF
  cd $REMOTE_DIR
  ./start.sh
EOF

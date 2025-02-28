#!/bin/bash

# Variables
LOCAL_DIR="."
REMOTE_USER="operador"
REMOTE_HOST="172.31.113.151"
REMOTE_DIR="/home/operador/ModulesDev"
START_SCRIPT="start.sh"

# Sincronizar archivos con rsync
rsync -avz --delete $LOCAL_DIR $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Conectarse al servidor y ejecutar el script
ssh $REMOTE_USER@$REMOTE_HOST << EOF
  cd $REMOTE_DIR
  ./start.sh
EOF
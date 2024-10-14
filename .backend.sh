#!/bin/bash

# Definir el puerto a verificar
PORT=5000

# Verificar si el puerto está en uso
if lsof -i :$PORT > /dev/null; then
    echo "El puerto $PORT está en uso. Eliminando el proceso..."
    
    # Obtener el PID del proceso que está usando el puerto y matarlo
    PID=$(lsof -t -i :$PORT)
    kill -9 $PID
    
    echo "Proceso $PID eliminado."
else
    echo "El puerto $PORT no está en uso."
fi

# Instalar dependencias y ejecutar la aplicación
pip3 install -r requirements.txt && \
python3 -m uvicorn api.main:app --host 0.0.0.0 --port $PORT --reload --log-level debug --use-colors

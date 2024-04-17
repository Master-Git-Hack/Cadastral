#!/bin/bash

# Cambiar al directorio del proyecto React v1
cd v1
yarn start &  # Iniciar el proyecto React v1 en segundo plano

# Cambiar al directorio del proyecto Vite v2
cd ../v2
yarn dev &  # Iniciar el proyecto Vite v2 en segundo plano

# Esperar a que ambos procesos terminen
wait
exit $?
#!/bin/bash
app="cadastral_container"
docker-compose -p ${app} up --build --force-recreate -d -V
#docker-compose up -d --no-deps --build  ${app}
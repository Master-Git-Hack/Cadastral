#!/bin/bash
app="cadastral.container"
docker-compose -p ${app} up --build
#docker-compose up -d --no-deps --build   
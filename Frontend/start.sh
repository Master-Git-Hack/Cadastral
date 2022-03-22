#!/bin/bash
app="docker.dev.react"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d --network=host -p 8080:80 \
  --name=${app} \
  -v $PWD:/app ${app} \
  

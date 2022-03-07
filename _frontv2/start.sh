#!/bin/bash
app="docker.dev.react"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d -p 80:80 \
  --name=${app} \
  -v $PWD:/app ${app}

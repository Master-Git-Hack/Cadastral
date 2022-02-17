#!/bin/bash
app="docker.dev.flask"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d -p 57637:80 \
  --name=${app} \
  -v $PWD:/app ${app}

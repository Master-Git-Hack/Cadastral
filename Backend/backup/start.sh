#!/bin/bash
app="docker.dev.flask"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d --network=host -p 5000:5000 \
  --name=${app} \
  -v $PWD:/app ${app}
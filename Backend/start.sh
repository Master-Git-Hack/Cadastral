#!/bin/bash
app="docker.dev.flask"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d --network=host -p 56733:56733 \
  --name=${app} \
  -v $PWD:/app ${app}
#!/bin/bash
app="docker.dev.nextjs"
docker stop ${app}
docker rm ${app}
docker build -t ${app} .
docker run -d --network=host -p 81:81 \
  --name=${app} \
  -v $PWD:/app ${app} \


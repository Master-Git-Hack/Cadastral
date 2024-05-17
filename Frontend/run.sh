#!/bin/bash
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf
app="frontend"
docker stop ${app}
docker rm ${app}
docker build -f Dockerfile -t ${app} .
docker run -d --restart on-failure \
--network=host \
-p 3000:81 \
-p 3001:82 \
--name=${app} \
-v $PWD:/app ${app} 
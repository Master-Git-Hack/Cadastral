#!/bin/bash
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf
app="backend_v1"
docker stop ${app}
docker rm ${app}
docker build -f Dockerfile -t ${app} .
docker run -d --restart on-failure \
--network=host \
-p 56733:56733 \
--name=${app} \
-v $PWD:/app ${app} 
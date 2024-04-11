#!/bin/bash
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf
app="backend"
docker stop ${app}
docker rm ${app}
docker build -f Dockerfile -t ${app} .
docker run -d --restart on-failure \
--network=host \
-p 5000:5000 \
-p 56733:56733 \
--name=${app} \
-v $PWD:/app ${app} 
@ECHO OFF
SET DOCKER_TLS_VERIFY=1
SET DOCKER_HOST=tcp://192.168.99.100:2376
SET DOCKER_CERT_PATH=C:\Users\jake\.docker\machine\machines\default
SET DOCKER_MACHINE_NAME=default
ECHO ON
docker build -t jakebladt/build-showman .
docker push jakebladt/build-showman
docker launch jakebladt/build-showman

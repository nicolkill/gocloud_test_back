IMAGE_TAG := nicolkill/gocloud_test_back
REVISION=$(shell git rev-parse --short HEAD)
RUN_STANDARD := docker run --rm -v `pwd`:/app -w /app node:carbon
RUN := docker run --rm -v `pwd`:/app -w /app ${IMAGE_TAG}:latest

all: build image

up:
	docker-compose up

build:
	$(RUN_STANDARD) npm install

image:
	docker build -t ${IMAGE_TAG}:${REVISION} .
	docker tag ${IMAGE_TAG}:${REVISION} ${IMAGE_TAG}:latest

bash:
	docker-compose exec app bash
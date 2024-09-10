#!/usr/bin/env bash

## Check if container name "test_postgres" allready running
if [ -z "$(docker ps --filter name=test_postgres)" ]; then
  docker compose -f ./test/docker-compose.yml up testpgdb -d
fi

## run service, see command in docker-compose.yml
docker compose -f ./test/docker-compose.yml run testusers 

## stop database
docker compose -f ./test/docker-compose.yml down

## remove stoped containers
docker container prune -f

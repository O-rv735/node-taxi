#!/usr/bin/env bash

## run database
docker compose -f ./env-test/docker-compose.yml up testpostgres -d

## run service e2e tests
docker compose -f ./env-test/docker-compose.yml run testusers 

## stop database
docker compose -f ./env-test/docker-compose.yml down

## remove stoped containers
docker container prune -f

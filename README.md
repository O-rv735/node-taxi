# Donatello

### installation
To run application you should have installed docker on your machine

To install all dependencies run 
```bash
npm run install:all
```

Generate .env files with command for macOS and Linux
```bash
npm run gen:env
```
if command fails run command below and then repeat previous command
```bash
chmod +x ./scripts/generate-env.sh
```
for Windows guys: use git bash to run this script
or copy content of ./env-dev/dev.env.example and put it to ./env-dev/.env file.
Update variables in newly created .env file.
Repeat this operations for `./env-prod` and `./env-test` directories.

### Run
Run in dev mode
```bash
npm run start:dev
```

Run in prod mode
```bash
npm run start:prod
```

To stop app app
```bash
npm run stop:prod
```
or
```bash
npm run stop:dev
```

### Running with docker compose commands
Run all services
```bash
docker compose -f /env-dev/docker-compose.yml up
```
Apply key -d for running in detached mode
```bash
docker compose -f /env-dev/docker-compose.yml up -d
```

Stop all services
```bash
docker compose -f /env-dev/docker-compose.yml down
```

Run only one service
```bash
docker compose -f /env-dev/docker-compose.yml up devpostgres -d
```

Stop only one service
```bash
docker compose -f /env-dev/docker-compose.yml stop users 
```

Rebuild image
```bash
docker compose -f /env-dev/docker-compose.yml build users
```

Rebuild image before run with --build option
```bash
docker compose -f /env-dev/docker-compose.yml up users --build -d
```

### Unit test
Run unit tests

```bash
docker compose run service_name npm run test
```

### e2e test
To run e2e test execute command below
```bash
npm run test:e2e
```
if command fails run command below and then repeat previous command
```bash
chmod +x ./scripts/users-service-e2e.sh
```



# Donatello

### installation
To install all dependencies run 
```bash
npm run install:all
```

Generate .env files with command
```bash
npm run gen:env
```
if comand fails run command below and then repeat previous command
```bash
chmod +x ./scripts/generate-env.sh
```

## Running the app in docker
Run all services
```bash
docker compose up
```
Apply key -d for running in detached mode
```bash
docker compose up -d
```

Stop all services
```bash
docker compose down
```

Run only one service
```bash
docker compose up postgres -d
```

Stop only one service
```bash
docker compose stop users 
```

Rebuild image
```bash
docker compose build users
```

Rebuild image before run with --build option
```bash
docker compose up users --build -d
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
if comand fails run command below and then repeat previous command
```bash
chmod +x ./scripts/users-service-e2e.sh
```



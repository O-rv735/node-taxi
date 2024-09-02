# Donatello

### installation
To install all dependencies run 
```bash
npm run install:all
```

Put content of env.example in .env and update credential as needed
```bash
cat env.example > .env
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

Rebuild image before run with --build option
```bash
docker compose up user service --build -d
```

# User service

## Installation

Install dependencies
```bash
npm install
```
Put content of env.example in .env and update credential as needed
```bash
cat env.example > .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migration and prisma
To generate Prisma types before first run or after update `prisma.schema` file run
```bash
npx prisma generate
```

Apply migrations in dev mode
```bash
npx prisma migrate dev
```

The --create-only command allows you to create a migration without applying it:
```bash
npx prisma migrate dev --create-only
```

In production and testing environments, use the migrate deploy command to apply migrations:
```bash
npx prisma migrate deploy
```

## API

- Users `/api/users`
  - GET `/api/users` returns all users
  - GET `/api/users:id` returns user by id
  - POST `/api/users` create user 
  - PATCH `/api/users` update user

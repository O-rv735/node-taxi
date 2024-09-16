# User service

## Installation
[Install docker on you machine](`https://docs.docker.com/engine/install/`)

Install dependencies
```bash
npm ci
```
To generate Prisma types before first run or after update `prisma.schema` file run
```bash
npx prisma generate
```

## Running the app locally

```bash
npm run start
```
watch mode
```bash
npm run start:dev
```
production mode
```bash
npm run start:prod
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

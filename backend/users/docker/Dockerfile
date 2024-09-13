FROM node:22-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

CMD npx prisma migrate dev && npm run start:dev
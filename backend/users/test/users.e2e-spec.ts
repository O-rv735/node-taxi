import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Role } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaClientExceptionFilter } from 'src/prisma/prisma-client-exception.filter';
import * as request from 'supertest';
import { truncateTables } from './util/truncate-tables.util';

const nonexistentId = '705e268b-c190-4f80-9bf4-48aab92ab5a1';

const fakeUser: CreateUserDto = {
  firstName: 'test',
  lastName: 'test last name',
  phone: '+111222334445555',
  email: 'test@test.com',
  password: '!@#1234vdJds',
  role: Role.User,
};

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await truncateTables();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        UsersModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);

    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should return 201 on success', () => request(app.getHttpServer())
    .post('/users')
    .send(fakeUser)
    .expect(201));

  it('/users (GET) should return 200', async () => {
    await request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users (GET) should return empty array if there are no users in database', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });

  it('/users:id (GET) should return 404 if user not found', () => request(app.getHttpServer())
    .get(`/users/${nonexistentId}`)
    .expect(404));

  it('/users:id (GET) should return 200 if user was found', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(fakeUser);
    const userId = res.body.id;

    await request(app.getHttpServer()).get(`/users/${userId}`).expect(200);
  });

  it('/users:id (PATCH) should return 200 if user was successfully updated', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(fakeUser);
    const userId = res.body.id;

    await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send({ lastName: 'new last name' })
      .expect(200);
  });

  it('/users:id (PATCH) should return 400 if user does not exists', async () => {
    await request(app.getHttpServer())
      .patch(`/users/${nonexistentId}`)
      .send({ lastName: 'new last name' })
      .expect(404);
  });

  it('/users:id (DELETE) should return 204 if user was successfully deleted', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send(fakeUser);
    const userId = res.body.id;

    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(204);
  });

  it('/users:id (DELETE) should return 404 if user does not exists', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${nonexistentId}`)
      .expect(404);
  });
});

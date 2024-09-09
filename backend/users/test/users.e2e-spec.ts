import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from '@prisma/client';
import { truncateTables } from './truncate-tables.util';

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
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) should return 200', () =>
    request(app.getHttpServer()).get('/users').expect(200));

  it('/users (GET) should return empty array if there are no users in database', () =>
    request(app.getHttpServer())
      .get('/users')
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toHaveLength(0);
      }));

  it('/users:id (GET) should return 404 if user not found', () =>
    request(app.getHttpServer()).get(`/users/${nonexistentId}`).expect(404));

  it('/users (POST) should return 201 on success', () =>
    request(app.getHttpServer()).post('/users').send(fakeUser).expect(201));
});

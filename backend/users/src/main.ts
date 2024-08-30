import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const port = configService.get('USERS_SERVICE_PORT');

  await app.listen(port, () => {
    console.log(`Application is running on ${port} port`);
  });
}

bootstrap();

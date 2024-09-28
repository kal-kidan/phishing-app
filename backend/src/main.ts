import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SeederService } from './modules/seeder/seeder.service';
import { UsersService } from './modules/users/users.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const seeder = app.get(SeederService);
  const userService = app.get(UsersService);
  const userCount = await userService.countUsers();

  if (userCount === 0) {
    await seeder.seed();
  } else {
    console.log('Users already exist, skipping seeding.');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from '@app/config/app';
import { establishConnection } from '@app/config/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await establishConnection();
  await app.listen(APP_PORT);
}
bootstrap();

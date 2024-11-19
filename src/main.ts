import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { establishConnection } from '@app/config/database';
import config from '@app/config';
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await establishConnection();
	await app.listen(config().appPort);
}
bootstrap();

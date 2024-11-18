import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { JwtTokenService } from '@app/services/jwt-token.service';
import { BearerMiddleware } from '@app/middleware/bearer.middleware';

@Module({
	controllers: [UsersController],
	providers: [UsersRepository, UsersService, JwtTokenService],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(UsersController);
	}
}

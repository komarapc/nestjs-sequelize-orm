import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { JwtTokenService } from '@app/services/jwt-token.service';
import { BearerMiddleware } from '@app/middleware/bearer.middleware';

@Module({
	controllers: [RolesController],
	providers: [RolesService, JwtTokenService, RolesRepository],
})
export class RolesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(RolesController);
	}
}

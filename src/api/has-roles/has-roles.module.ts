import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';
import { HasRoleRepository } from './has-roles.repository';
import { BearerMiddleware } from '@app/middleware/bearer.middleware';
import { JwtTokenService } from '@app/services/jwt-token.service';

@Module({
	controllers: [HasRolesController],
	providers: [HasRolesService, HasRoleRepository, JwtTokenService],
})
export class HasRolesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(BearerMiddleware).forRoutes(HasRolesController);
	}
}

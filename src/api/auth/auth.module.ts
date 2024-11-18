import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokenService } from '@app/services/jwt-token.service';
import { UsersRepository } from '../users/users.repository';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import { BearerMiddleware } from '@app/middleware/bearer.middleware';
import { RolesRepository } from '../roles/roles.repository';

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtTokenService,
		UsersRepository,
		HasRoleRepository,
		RolesRepository,
	],
})
export class AuthModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(BearerMiddleware)
			.exclude({ path: 'auth/login', method: RequestMethod.POST })
			.forRoutes(AuthController);
	}
}

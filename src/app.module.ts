import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { HasRolesModule } from './api/has-roles/has-roles.module';
import { AuthModule } from './api/auth/auth.module';
import config from '@app/config';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [config],
		}),
		UsersModule,
		RolesModule,
		HasRolesModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { HasRolesModule } from './api/has-roles/has-roles.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, RolesModule, HasRolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HasRolesController } from './has-roles.controller';
import { HasRolesService } from './has-roles.service';
import { HasRoleRepository } from './has-roles.repository';

@Module({
	controllers: [HasRolesController],
	providers: [HasRolesService, HasRoleRepository],
})
export class HasRolesModule {}

import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { HasRolesService } from './has-roles.service';
import { HasRoleCreateSchema } from './has-roles.schema';
import { Response } from 'express';

@Controller('has-roles')
export class HasRolesController {
	constructor(private readonly hasRoleService: HasRolesService) {}
	@Post()
	async store(@Body() body: HasRoleCreateSchema, @Res() res: Response) {
		const result = await this.hasRoleService.store(body);
		res.status(result.status_code).json(result);
	}

	@Delete(':id')
	async destroy(@Param('id') id: string, @Res() res: Response) {
		const result = await this.hasRoleService.destroy(id);
		res.status(result.status_code).json(result);
	}
}

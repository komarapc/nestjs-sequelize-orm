import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Response } from 'express';
import {
	RolesCreateSchema,
	RolesQuerySchema,
	RolesUpdateSchema,
} from './roles.schema';

@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RolesService) {}

	@Get()
	async getAll(@Res() res: Response, @Query() query: RolesQuerySchema) {
		const result = await this.roleService.getAll(query);
		res.status(result.status_code).json(result);
	}

	@Get(':id')
	async findOneById(@Param('id') id: string, @Res() res: Response) {
		const result = await this.roleService.findOneById(id);
		res.status(result.status_code).json(result);
	}

	@Post()
	async store(@Body() data: RolesCreateSchema, @Res() res: Response) {
		const result = await this.roleService.store(data);
		res.status(result.status_code).json(result);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() data: RolesUpdateSchema,
		@Res() res: Response,
	) {
		const result = await this.roleService.update(id, data);
		res.status(result.status_code).json(result);
	}

	@Delete(':id')
	async destroy(@Param('id') id: string, @Res() res: Response) {
		const result = await this.roleService.destroy(id);
		res.status(result.status_code).json(result);
	}
}

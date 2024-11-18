import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { query, Response } from 'express';
import {
	CreateUserSchema,
	QueryUserSchema,
	UpdateUserSchema,
} from './users.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	async getAll(@Res() res: Response, @Query() query: QueryUserSchema) {
		const users = await this.userService.getAll(query);
		res.status(HttpStatus.OK).json(users);
	}

	@Post()
	async store(@Res() res: Response, @Body() body: CreateUserSchema) {
		const result = await this.userService.store(body);
		res.status(result.status_code).json(result);
	}

	@Get(':id')
	async getById(@Res() res: Response, @Param('id') id: string) {
		const result = await this.userService.findOneById(id);
		res.status(result.status_code).json(result);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateUserSchema,
		@Res() res: Response,
	) {
		const result = await this.userService.update(id, body);
		res.status(result.status_code).json(result);
	}
}

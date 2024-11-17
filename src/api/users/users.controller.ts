import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query,
	Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { query, Response } from 'express';
import { CreateUserSchema, QueryUserSchema } from './users.schema';

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
}

import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const users = await this.userService.getAll();
		res.status(HttpStatus.OK).json(users);
	}

	@Post()
	async store(@Res() res: Response, @Body() body: UserDto) {
		const result = await this.userService.store(body);
		res.status(result.status_code).json(result);
	}
}

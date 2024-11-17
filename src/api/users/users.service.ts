import { Injectable } from '@nestjs/common';
import { UserInterface, UsersRepository } from './users.repository';
import { responseJson } from '@app/utils/response-data';
import {
	createUserSchema,
	CreateUserSchema,
	QueryUserSchema,
} from './users.schema';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { excludeObjectFields } from '@app/utils';
@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepository) {}
	async getAll(query: QueryUserSchema) {
		const users = await this.userRepo.getAll(query);
		if (!users.count)
			return responseJson({
				status_code: 'NOT_FOUND',
				message: 'No data found',
			});
		const usersWithoutPassword = users.users.map((user) =>
			excludeObjectFields(user.toJSON(), ['password']),
		);
		return responseJson({
			status_code: 'OK',
			message: 'Success',
			data: { users: usersWithoutPassword, total: users.count },
		});
	}

	async store(user: CreateUserSchema) {
		try {
			const parsedUser = createUserSchema.parse(user);
			const hashPassword = bcrypt.hashSync(parsedUser.password, 10);
			const newUser = { ...parsedUser!, password: hashPassword };
			const userExist = await this.userRepo.findByEmail(newUser.email!);
			if (userExist)
				return responseJson({
					status_code: 'BAD_REQUEST',
					message: 'Email already exist',
				});
			const result = await this.userRepo.store({
				name: newUser.name!,
				email: newUser.email!,
				password: newUser.password!,
			});
			return responseJson({
				status_code: 'CREATED',
				message: 'Success',
				data: excludeObjectFields(result.toJSON(), ['password']),
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				const formattedErrors = error.errors.map((err) => ({
					name: err.path.join('.'),
					message: err.message,
				}));
				return responseJson({
					status_code: 'BAD_REQUEST',
					errors: formattedErrors,
				});
			}
			return responseJson({
				status_code: 'INTERNAL_SERVER_ERROR',
				errors: error.message,
			});
		}
	}
}

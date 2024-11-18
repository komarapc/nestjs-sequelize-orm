import { Injectable } from '@nestjs/common';
import { UserInterface, UsersRepository } from './users.repository';
import { responseJson } from '@app/utils/response-data';
import {
	createUserSchema,
	CreateUserSchema,
	queryUserSchema,
	QueryUserSchema,
} from './users.schema';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { excludeObjectFields, metaPagination } from '@app/utils';
import { User } from '@app/models';
@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepository) {}
	async getAll(query: QueryUserSchema) {
		try {
			const parsedQuery = queryUserSchema.parse(query);
			const users = await this.userRepo.getAll(query);
			if (!users.users.length)
				return responseJson({
					status_code: 'NOT_FOUND',
					message: 'No data found',
				});
			const usersWithoutPassword = users.users.map((user) =>
				excludeObjectFields(user.toJSON(), ['password']),
			);
			const pagination = metaPagination(
				{ limit: parsedQuery.limit, page: parsedQuery.page },
				users.count,
			);
			return responseJson({
				status_code: 'OK',
				message: 'Success',
				data: { users: usersWithoutPassword, pagination },
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
	async findOneById(id: string) {
		try {
			let user = await this.userRepo.getById(id);
			if (!user)
				return responseJson({
					status_code: 'NOT_FOUND',
					message: 'User not found',
				});
			user = excludeObjectFields(user.toJSON(), ['password']);
			return responseJson({
				status_code: 'OK',
				message: 'Success',
				data: user,
			});
		} catch (error) {
			return responseJson({
				status_code: 'INTERNAL_SERVER_ERROR',
				errors: error.message,
			});
		}
	}
}

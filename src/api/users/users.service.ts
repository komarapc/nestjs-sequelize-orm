import { Injectable } from '@nestjs/common';
import { UserInterface, UsersRepository } from './users.repository';
import {
	responseBadRequest,
	responseCreated,
	responseInternalServerError,
	responseNotFound,
	responseOk,
} from '@app/utils/response-data';
import {
	createUserSchema,
	CreateUserSchema,
	queryUserSchema,
	QueryUserSchema,
	updateUserSchema,
	UpdateUserSchema,
} from './users.schema';
import * as bcrypt from 'bcrypt';
import {
	excludeObjectFields,
	metaPagination,
	zodErrorHandle,
} from '@app/utils';
@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepository) {}
	async getAll(query: QueryUserSchema) {
		try {
			const parsedQuery = queryUserSchema.parse(query);
			const users = await this.userRepo.getAll(query);
			if (!users.users.length) return responseNotFound('No data found');
			const usersWithoutPassword = users.users.map((user) =>
				excludeObjectFields(user.toJSON(), ['password']),
			);
			const pagination = metaPagination(
				{ limit: parsedQuery.limit, page: parsedQuery.page },
				users.count,
			);
			return responseOk({ users: usersWithoutPassword, pagination });
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async store(user: CreateUserSchema) {
		try {
			const parsedUser = createUserSchema.parse(user);
			const hashPassword = bcrypt.hashSync(parsedUser.password, 10);
			const newUser = { ...parsedUser!, password: hashPassword };
			const userExist = await this.userRepo.findByEmail(newUser.email!);
			if (userExist)
				return responseBadRequest('User with this email already exist');
			const result = await this.userRepo.store({
				name: newUser.name!,
				email: newUser.email!,
				password: newUser.password!,
			});
			return responseCreated(
				excludeObjectFields(result.toJSON(), ['password']),
			);
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}
	async findOneById(id: string) {
		try {
			let user = await this.userRepo.getById(id);
			if (!user) return responseNotFound('User not found');
			user = excludeObjectFields(user.toJSON(), ['password']);
			return responseOk(user);
		} catch (error) {
			return responseInternalServerError(error.message);
		}
	}
	async update(id: string, user: UpdateUserSchema) {
		try {
			const existUser: UserInterface = (
				await this.userRepo.getById(id)
			).toJSON();
			if (!existUser || existUser.deletedAt)
				return responseNotFound('User not found');
			const parsedUser = updateUserSchema.parse(user);
			const removeEmptyValue = Object.fromEntries(
				Object.entries(parsedUser).filter(
					([_, value]) => value !== null && value !== '' && value !== undefined,
				),
			);
			if (Object.keys(removeEmptyValue).length === 0)
				return responseBadRequest('No data to update');
			if (parsedUser.password)
				parsedUser.password = bcrypt.hashSync(parsedUser.password, 10);

			const result = await this.userRepo.update(id, parsedUser);
			return responseOk(excludeObjectFields(result.toJSON(), ['password']));
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}
}

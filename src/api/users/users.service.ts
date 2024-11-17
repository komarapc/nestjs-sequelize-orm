import { HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface, UsersRepository } from './users.repository';
import { responseJson } from '@app/utils/response-data';
import { UserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepository) {}
	async getAll() {
		const users = await this.userRepo.getAll();
		return responseJson({ status_code: 'OK', message: 'Success', data: users });
	}

	async store(user: UserDto) {
		try {
			const hashPassword = bcrypt.hashSync(user.password, 12);
			const newUser: UserInterface = {
				...user,
				password: hashPassword,
			};
			const result = await this.userRepo.store(newUser);
			return responseJson({
				status_code: 'CREATED',
				message: 'User created successfully',
				data: result,
			});
		} catch (error) {
			return responseJson({
				status_code: 'INTERNAL_SERVER_ERROR',
				message: error.message,
			});
		}
	}
}

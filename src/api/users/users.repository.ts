import { User } from '@app/models';
import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
export interface UserInterface {
	id?: string;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

@Injectable()
export class UsersRepository {
	async getAll() {
		const users = User.findAll({
			where: { deletedAt: null },
		});
		return users;
	}

	async getById(id: string) {
		const users = User.findByPk(id);
		return users;
	}

	async store(user: UserInterface) {
		const id = v7();
		const newUser = User.create({ ...user, id });
		return newUser;
	}
}

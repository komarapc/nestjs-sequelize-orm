import { User } from '@app/models';
import { Injectable } from '@nestjs/common';
import { v7 } from 'uuid';
import { QueryUserSchema } from './users.schema';
import { Op } from 'sequelize';
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
	private buildWhereClause(query: QueryUserSchema) {
		const whereClause: any = {
			deletedAt: null,
		};
		if (query.name && query.name.trim() !== '') {
			whereClause.name = {
				[Op.like]: `%${query.name}%`,
			};
		}
		if (query.email && query.email.trim() !== '') {
			whereClause.email = {
				[Op.like]: `%${query.email}%`,
			};
		}
		return whereClause;
	}
	async getAll(query: QueryUserSchema) {
		const limit = query.limit || 10;
		const page = query.page || 1;
		const whereClause = this.buildWhereClause(query);
		const { count, rows } = await User.findAndCountAll({
			where: whereClause,
			offset: (page - 1) * limit,
			limit: limit,
		});
		return { count, users: rows };
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

	async findByEmail(email: string) {
		return User.findOne({ where: { email } });
	}
}

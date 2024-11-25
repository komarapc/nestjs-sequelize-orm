import { HasRoles, Roles, User } from '@app/models/default';
import { Injectable } from '@nestjs/common';
import { QueryUserSchema, UpdateUserSchema } from './users.schema';
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
			include: [
				{
					model: HasRoles,
					as: 'has_roles',
					foreignKey: 'user_id',
					attributes: ['id'],
					include: [
						{
							model: Roles,
							as: 'role',
							attributes: ['id', 'name', 'description'],
						},
					],
				},
			],
			offset: (page - 1) * limit,
			limit: limit,
		});
		return { count, users: rows };
	}

	async findOneById(id: string) {
		const users = User.findByPk(id);
		return users;
	}

	async store(user: UserInterface) {
		const newUser = User.create({ ...user });
		return newUser;
	}

	async findByEmail(email: string) {
		return User.findOne({ where: { email } });
	}

	async update(id: string, data: UpdateUserSchema) {
		const user = await User.findByPk(id);
		const filteredData = Object.fromEntries(
			Object.entries(data).filter(
				([_, value]) => value !== null && value !== '' && value !== undefined,
			),
		);
		await user.update(filteredData);
		return user;
	}

	async destroy(id: string) {
		const user = await User.findByPk(id);
		await user.destroy({ force: false });
		return user;
	}

	async findOneByEmail(email: string) {
		return await User.findOne({ where: { email } });
	}
}

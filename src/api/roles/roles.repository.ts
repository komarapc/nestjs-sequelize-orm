import { Injectable } from '@nestjs/common';
import {
	RolesCreateSchema,
	RolesQuerySchema,
	RolesUpdateSchema,
} from './roles.schema';
import { Roles } from '@app/models/default';
import { Op } from 'sequelize';
import { filteredEmptyObj } from '@app/utils';

export interface RolesInterface {
	id?: string;
	name: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}
@Injectable()
export class RolesRepository {
	private buildWhereClause(query: RolesQuerySchema) {
		const whereClause: any = {
			deletedAt: null,
		};
		if (query.name && query.name.trim() !== '') {
			whereClause.name = {
				[Op.like]: `%${query.name}%`,
			};
		}
		return whereClause;
	}
	async getAll(query?: RolesQuerySchema) {
		const limit = query.limit || 10;
		const page = query.page || 1;
		const roles = await Roles.findAndCountAll({
			where: this.buildWhereClause(query),
			offset: (page - 1) * limit,
			limit,
		});
		return roles;
	}
	async findOneById(id: string) {
		return await Roles.findByPk(id);
	}
	async store(data: RolesCreateSchema) {
		const newRole = await Roles.create({
			name: data.name,
			description: data.description,
		});
		return newRole;
	}
	async update(id: string, data: RolesUpdateSchema) {
		const { data: filteredData } = filteredEmptyObj(data);
		const role = await this.findOneById(id);
		await role.update(filteredData);
		return role;
	}
	async destroy(id: string) {
		await Roles.destroy({
			where: {
				id,
			},
		});
	}
}

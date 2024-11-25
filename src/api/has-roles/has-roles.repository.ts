import { Injectable } from '@nestjs/common';
import { HasRoleCreateSchema } from './has-roles.schema';
import { HasRoles, Roles } from '@app/models/default';

@Injectable()
export class HasRoleRepository {
	async findOneById(id: string) {
		return await HasRoles.findByPk(id);
	}
	async store(data: HasRoleCreateSchema) {
		const result = await HasRoles.create(data);
		return result;
	}
	async findByRoleAndUserId(user_id: string, role_id: string) {
		const result = await HasRoles.findOne({ where: { user_id, role_id } });
		return result;
	}
	async destroy(id: string) {
		const result = await HasRoles.destroy({ where: { id } });
		return result;
	}

	async getByUserId(user_id: string) {
		const data = await HasRoles.findAll({
			where: { user_id },
			attributes: ['id'],
			include: [
				{
					model: Roles,
					as: 'role',
					attributes: ['id', 'name'],
				},
			],
		});
		return data.map((item) => {
			const role = item.toJSON();
			return {
				id: role.role.id,
				name: role.role.name,
			};
		});
	}
}

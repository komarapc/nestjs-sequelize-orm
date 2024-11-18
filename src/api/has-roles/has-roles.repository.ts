import { Injectable } from '@nestjs/common';
import { HasRoleCreateSchema } from './has-roles.schema';
import { HasRoles } from '@app/models/default';

@Injectable()
export class HasRoleRepository {
	async store(data: HasRoleCreateSchema) {
		const result = await HasRoles.create(data);
		return result;
	}
}

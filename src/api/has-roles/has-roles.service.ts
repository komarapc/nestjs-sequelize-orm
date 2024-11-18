import { Injectable } from '@nestjs/common';
import { HasRoleRepository } from './has-roles.repository';
import { hasRoleCreateSchema, HasRoleCreateSchema } from './has-roles.schema';
import { zodErrorHandle } from '@app/utils';
import {
	responseBadRequest,
	responseCreated,
	responseInternalServerError,
	responseNotFound,
	responseOk,
} from '@app/utils/response-data';

@Injectable()
export class HasRolesService {
	constructor(private readonly hasRoleRepo: HasRoleRepository) {}

	async store(data: HasRoleCreateSchema) {
		try {
			const parsedData = hasRoleCreateSchema.parse(data);
			const isExist = await this.hasRoleRepo.findByRoleAndUserId(
				parsedData.user_id,
				parsedData.role_id,
			);
			if (isExist) return responseBadRequest('Role already exist');
			const result = await this.hasRoleRepo.store(parsedData);
			return responseCreated(result);
		} catch (error) {
			const { errors, hasError } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async destroy(id: string) {
		try {
			const hasRole = await this.hasRoleRepo.findOneById(id);
			if (!hasRole || hasRole.toJSON().deletedAt)
				return responseNotFound('Role not found');

			await this.hasRoleRepo.destroy(id);
			return responseOk(null);
		} catch (error) {
			return responseInternalServerError(error.message);
		}
	}
}

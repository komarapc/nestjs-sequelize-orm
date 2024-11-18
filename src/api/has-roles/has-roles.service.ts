import { Injectable } from '@nestjs/common';
import { HasRoleRepository } from './has-roles.repository';
import { hasRoleCreateSchema, HasRoleCreateSchema } from './has-roles.schema';
import { zodErrorHandle } from '@app/utils';
import {
	responseBadRequest,
	responseCreated,
	responseInternalServerError,
} from '@app/utils/response-data';

@Injectable()
export class HasRolesService {
	constructor(private readonly hasRoleRepo: HasRoleRepository) {}

	async store(data: HasRoleCreateSchema) {
		try {
			const parsedData = hasRoleCreateSchema.parse(data);
			const result = await this.hasRoleRepo.store(parsedData);
			return responseCreated(result);
		} catch (error) {
			const { errors, hasError } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}
}

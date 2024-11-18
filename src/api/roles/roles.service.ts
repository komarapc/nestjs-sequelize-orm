import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import {
	rolesCreateSchema,
	RolesCreateSchema,
	rolesQuerySchema,
	RolesQuerySchema,
	rolesUpdateSchema,
	RolesUpdateSchema,
} from './roles.schema';
import { filteredEmptyObj, metaPagination, zodErrorHandle } from '@app/utils';
import {
	responseBadRequest,
	responseCreated,
	responseInternalServerError,
	responseNotFound,
	responseOk,
} from '@app/utils/response-data';

@Injectable()
export class RolesService {
	constructor(private readonly roleRepo: RolesRepository) {}

	async getAll(query: RolesQuerySchema) {
		try {
			const parsedQuery = rolesQuerySchema.parse(query);
			const { count, rows: users } = await this.roleRepo.getAll(parsedQuery);
			if (!users.length) return responseNotFound('Data not found');
			const pagination = metaPagination(
				{ limit: parsedQuery.limit, page: parsedQuery.page },
				count,
			);
			return responseOk({ users, pagination });
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async findOneById(id: string) {
		try {
			const roles = (await this.roleRepo.findOneById(id)).toJSON();
			if (!roles || roles.deletedAt) return responseNotFound('Data not found');
			return responseOk(roles);
		} catch (error) {
			return responseInternalServerError(error.message);
		}
	}

	async store(data: RolesCreateSchema) {
		try {
			const parsedData = rolesCreateSchema.parse(data);
			const role = await this.roleRepo.store(parsedData);
			return responseCreated(role);
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async update(id: string, data: RolesUpdateSchema) {
		try {
			if (!(await this.roleExist(id)))
				return responseNotFound('Data not found');
			const parsedData = rolesUpdateSchema.parse(data);
			const { data: filteredData, length } = filteredEmptyObj(parsedData);
			if (!length) return responseBadRequest('No data provided to update');
			const role = await this.roleRepo.update(id, filteredData);
			return responseOk(role);
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async destroy(id: string) {
		try {
			if (!(await this.roleExist(id)))
				return responseNotFound('Data not found');
			await this.roleRepo.destroy(id);
			return responseOk(null);
		} catch (error) {
			return responseInternalServerError(error.message);
		}
	}

	private async roleExist(id: string) {
		const role = (await this.roleRepo.findOneById(id)).toJSON();
		if (!role || role.deletedAt) return false;
		return true;
	}
}

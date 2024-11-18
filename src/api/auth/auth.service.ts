import { JwtTokenService } from '@app/services/jwt-token.service';
import { Injectable } from '@nestjs/common';
import {
	authLoginSchema,
	AuthLoginSchema,
	authLoginWithRoleSchema,
	AuthLoginWithRoleSchema,
} from './auth.schema';
import { UsersRepository } from '../users/users.repository';
import { HasRoleRepository } from '../has-roles/has-roles.repository';
import {
	responseBadRequest,
	responseInternalServerError,
	responseNotFound,
	responseOk,
	responseUnauthorized,
} from '@app/utils/response-data';
import * as bcrypt from 'bcrypt';
import { excludeObjectFields, zodErrorHandle } from '@app/utils';
import { JwtPayload } from 'jsonwebtoken';
import { RolesRepository } from '../roles/roles.repository';
import { JWT_SECRET } from '@app/config/app';

type PayloadToken = {
	user_id: string;
	iat: number;
	exp: number;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly tokenService: JwtTokenService,
		private readonly userRepo: UsersRepository,
		private readonly hasRoleRepo: HasRoleRepository,
		private readonly roleRepo: RolesRepository,
	) {}
	async login(data: AuthLoginSchema) {
		try {
			const parsedData = authLoginSchema.parse(data);
			const user = (
				await this.userRepo.findOneByEmail(parsedData.email)
			).toJSON();
			if (!user || user.deletedAt) return responseNotFound('User not found');
			const matchPassword = bcrypt.compareSync(
				parsedData.password,
				user.password,
			);
			if (!matchPassword) return responseUnauthorized('Password not match');
			const avaliableRoles = await this.hasRoleRepo.getByUserId(user.id);
			if (!avaliableRoles.length)
				return responseUnauthorized('User not have any role');

			const token = await this.tokenService.generateToken(
				{ user_id: user.id },
				'5m',
			);
			return responseOk({
				msg: 'Select available role to continue',
				token,
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					roles: avaliableRoles,
				},
			});
		} catch (error) {
			const { errors, hasError } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}

	async loginWithRole(data: AuthLoginWithRoleSchema) {
		try {
			const parsedData = authLoginWithRoleSchema.parse(data);
			const token = await this.tokenService.getToken();
			const payload: any = await this.tokenService.getPayload(token);
			const [user, roles] = await Promise.all([
				this.userRepo.findOneById(payload.user_id),
				this.roleRepo.findOneById(parsedData.role_id),
			]);
			if (!user) return responseNotFound('User not found');
			if (!roles) return responseNotFound('Role not found');
			const newToken = await this.tokenService.generateToken(
				{ user_id: user.toJSON().id, role_id: roles.toJSON().id },
				'1d',
			);
			return responseOk({
				token: newToken,
				user: excludeObjectFields(user.toJSON(), ['password']),
				role: roles,
			});
		} catch (error) {
			const { hasError, errors } = zodErrorHandle(error);
			if (hasError) return responseBadRequest(errors);
			return responseInternalServerError(error.message);
		}
	}
}

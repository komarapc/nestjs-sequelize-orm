import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '@app/config';
@Injectable()
export class JwtTokenService {
	private token: string = '';
	async setToken(token: string) {
		this.token = token;
	}
	async getToken() {
		return this.token;
	}
	async verifyToken(token: string) {
		return jwt.verify(token, config().jwtSecret);
	}
	async getPayload(token: string) {
		return jwt.decode(token);
	}
	async generateToken(payload: any, expiresIn: string) {
		return jwt.sign(payload, config().jwtSecret, { expiresIn });
	}
}

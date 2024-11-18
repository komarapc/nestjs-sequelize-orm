import { JWT_SECRET } from '@app/config/app';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
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
		return jwt.verify(token, JWT_SECRET);
	}
	async getPayload(token: string) {
		return jwt.decode(token);
	}
	async generateToken(payload: any, expiresIn: string) {
		return jwt.sign(payload, JWT_SECRET, { expiresIn });
	}
}

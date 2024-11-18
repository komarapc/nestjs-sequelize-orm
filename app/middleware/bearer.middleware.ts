import { JwtTokenService } from '@app/services/jwt-token.service';
import { responseUnauthorized } from '@app/utils/response-data';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BearerMiddleware {
	private readonly logger: Logger = new Logger(BearerMiddleware.name);
	constructor(private readonly tokenService: JwtTokenService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		// this.logger.log(BearerMiddleware.name);
		const authorization = req.headers.authorization;

		if (!authorization) {
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.json(responseUnauthorized('Unauthorized'));
		}
		const [bearer, token] = authorization.split(' ');
		if (bearer !== 'Bearer') {
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.json(responseUnauthorized('Unauthorized'));
		}
		try {
			const payload = await this.tokenService.verifyToken(token);
			if (!payload) {
				return res
					.status(HttpStatus.UNAUTHORIZED)
					.json(responseUnauthorized('Unauthorized'));
			}
			await this.tokenService.setToken(token);
		} catch (error) {
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.json(responseUnauthorized('Unauthorized'));
		}
		next();
	}
}

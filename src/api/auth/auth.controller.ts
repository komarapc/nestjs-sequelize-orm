import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginSchema, AuthLoginWithRoleSchema } from './auth.schema';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('login')
	async login(@Res() res: Response, @Body() body: AuthLoginSchema) {
		const result = await this.authService.login(body);
		res.status(result.status_code).json(result);
	}

	@Post('role')
	async loginWithRole(
		@Res() res: Response,
		@Body() body: AuthLoginWithRoleSchema,
	) {
		const result = await this.authService.loginWithRole(body);
		res.status(result.status_code).json(result);
	}
}

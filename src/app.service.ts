import { ResponseData, responseJson } from '@app/utils/response-data';
import { Injectable } from '@nestjs/common';
import config from '@app/config';
@Injectable()
export class AppService {
	async getHello(): Promise<ResponseData> {
		return responseJson({
			status_code: 'OK',
			data: {
				app_name: process.env.APP_NAME || 'NestJS',
				version: process.env.APP_VERSION || '1.0.0',
			},
		});
	}
}

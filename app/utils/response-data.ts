export interface ResponseData {
	status_code: number;
	status_message: string;
	message: string;
	data?: any;
	errors?: any;
}

export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	UNPROCESSABLE_ENTITY: 422,
	CONFLICT: 409,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
};
export const RESPONSE_STATUS_MESSAGE = {
	200: 'OK',
	201: 'Created',
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	422: 'Unprocessable Entity',
	409: 'Conflict',
	429: 'Too Many Requests',
	500: 'Internal Server Error',
	503: 'Service Unavailable',
};

type ResponseDataProps = {
	status_code: keyof typeof HTTP_STATUS;
	message?: any;
	data?: any;
	errors?: any;
};
export const responseJson = (props: ResponseDataProps): ResponseData => ({
	status_code: HTTP_STATUS[props.status_code],
	status_message: RESPONSE_STATUS_MESSAGE[HTTP_STATUS[props.status_code]],
	message:
		props.message || RESPONSE_STATUS_MESSAGE[HTTP_STATUS[props.status_code]],
	data: props.data,
	errors: props.errors,
});

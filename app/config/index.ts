export default () => ({
	appName: process.env.APP_NAME,
	appVersion: process.env.APP_VERSION,
	appPort: process.env.APP_PORT,
	appDebug: process.env.APP_DEBUG,
	databaseUrl: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET,
});

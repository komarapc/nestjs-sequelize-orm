import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './app';
const config = {
	databaseUrl: DATABASE_URL,
};
export const sequelize = new Sequelize(config.databaseUrl, { logging: false });

export const establishConnection = async () => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		// exit
		console.error('Unable to connect to the database:', error);
		process.exit(1);
	}
};

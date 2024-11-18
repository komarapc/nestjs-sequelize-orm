import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './app';
const config = {
	databaseUrl: DATABASE_URL,
};
// connection default
export const connection = new Sequelize(config.databaseUrl, { logging: false });

/**
 * add more connections if needed
 */

export const establishConnection = async () => {
	try {
		await connection.authenticate();
	} catch (error) {
		// exit
		console.error('Unable to connect to the database:', error);
		process.exit(1);
	}
};

import { Sequelize } from 'sequelize';
import * as db_default from '@app/models/default';
import config from '@app/config';

/**
 * * Database connection
 */
export const connection = new Sequelize(config().databaseUrl, {
	logging: false,
});

/**
 * add more connections if needed
 */

export const establishConnection = async () => {
	try {
		await connection.authenticate();
		await syncDatabase();
	} catch (error) {
		// exit
		console.error('Unable to connect to the database:', error);
		process.exit(1);
	}
};

export const syncDatabase = async () => {
	await db_default.defineAssociations();
	await db_default.syncModels();
};

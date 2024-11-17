import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './app';

export const sequelize = new Sequelize(DATABASE_URL);

export const establishConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    // exit
    console.error('Unable to connect to the database:', error);
  }
};

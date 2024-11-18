import { sequelize } from '@app/config/database';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
		paranoid: true,
	},
);
User.sync({ alter: true, logging: false });
export default User;

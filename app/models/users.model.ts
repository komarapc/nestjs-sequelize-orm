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
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
		deletedAt: 'destroyTime',
	},
);
User.sync({ alter: true, logging: false });
export default User;

import { connection } from '@app/config/database';
import { DataTypes, Model } from 'sequelize';
import * as uuid from 'uuid';
import HasRoles from './has-roles.model';
class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			defaultValue: () => uuid.v7(),
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
		modelName: 'users',
		sequelize: connection,
		tableName: 'users',
		timestamps: true,
		paranoid: true,
	},
);

export default User;

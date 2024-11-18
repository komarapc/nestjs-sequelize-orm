import { DataTypes, Model } from 'sequelize';
import { connection } from '@app/config/database';
import * as uuid from 'uuid';
import Roles from './roles.model';
import User from './users.model';
class HasRoles extends Model {}
HasRoles.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			defaultValue: () => uuid.v7(),
		},
		role_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: Roles,
				key: 'id',
			},
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize: connection,
		modelName: 'has_roles',
		tableName: 'has_roles',
		timestamps: true,
	},
);

export default HasRoles;

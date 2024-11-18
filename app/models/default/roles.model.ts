import { connection } from '@app/config/database';
import { DataTypes, Model } from 'sequelize';
import * as uuid from 'uuid';
class Roles extends Model {}

Roles.init(
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
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: connection,
		tableName: 'roles',
		timestamps: true,
		paranoid: true,
	},
);
Roles.sync();
export default Roles;

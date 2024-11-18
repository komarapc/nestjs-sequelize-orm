import { sequelize } from '@app/config/database';
import { DataTypes, Model } from 'sequelize';

class Roles extends Model {}

Roles.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
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
		sequelize,
		tableName: 'roles',
		timestamps: true,
		paranoid: true,
	},
);
Roles.sync();
export default Roles;

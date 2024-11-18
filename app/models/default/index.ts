import HasRoles from './has-roles.model';
import Roles from './roles.model';
import User from './users.model';

export { default as User } from './users.model';
export { default as Roles } from './roles.model';
export { default as HasRoles } from './has-roles.model';

export const defineAssociations = async () => {
	User.hasMany(HasRoles, {
		foreignKey: 'user_id',
		as: 'has_roles',
	});
	Roles.hasMany(HasRoles, {
		foreignKey: 'role_id',
		as: 'has_roles',
	});
	HasRoles.belongsTo(User, {
		foreignKey: 'user_id',
		as: 'user',
	});
	HasRoles.belongsTo(Roles, {
		foreignKey: 'role_id',
		as: 'role',
	});
};

export const syncModels = async () => {
	await User.sync({ alter: true, logging: false });
	await Roles.sync({ alter: true, logging: false });
	await HasRoles.sync({ alter: true, logging: false });
};

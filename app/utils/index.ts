export const excludeObjectFields = <T>(obj: T, fields: Array<keyof T>) => {
	const newObj = { ...obj };
	fields.forEach((field) => {
		delete newObj[field];
	});
	return newObj;
};

import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
});
export const updateUserSchema = z.object({
	name: z.string().min(2).optional(),
	email: z.string().email().optional(),
	password: z.string().min(8).optional(),
});

export const queryUserSchema = z.object({
	name: z.string().min(2).optional(),
	email: z.string().email().optional(),
	start_date: z
		.string()
		.transform((str) => new Date(str))
		.optional(),
	end_date: z
		.string()
		.transform((str) => new Date(str))
		.optional(),
	page: z.string().optional().transform(Number),
	limit: z.string().optional().transform(Number),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type QueryUserSchema = z.infer<typeof queryUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

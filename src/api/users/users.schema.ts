import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
});

export const queryUserSchema = z.object({
	name: z.string().min(2).optional(),
	email: z.string().email().optional(),
	start_date: z.date().optional(),
	end_date: z.date().optional(),
	page: z.number().int().positive().optional().default(1),
	limit: z.number().int().positive().optional().default(10),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type QueryUserSchema = z.infer<typeof queryUserSchema>;

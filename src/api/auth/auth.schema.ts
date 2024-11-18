import { z } from 'zod';

export const authLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
export const authLoginWithRoleSchema = z.object({
	role_id: z.string().uuid(),
});
export type AuthLoginSchema = z.infer<typeof authLoginSchema>;
export type AuthLoginWithRoleSchema = z.infer<typeof authLoginWithRoleSchema>;

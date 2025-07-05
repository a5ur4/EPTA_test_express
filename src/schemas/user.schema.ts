import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string({ required_error: "Nome é obrigatório." }).min(3, "Nome deve ter no mínimo 3 caracteres."),
    email: z.string({ required_error: "Email é obrigatório." }).email("Email inválido."),
    password: z.string({ required_error: "Senha é obrigatória." }).min(6, "Senha deve ter no mínimo 6 caracteres.")
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
    email: z.string({ required_error: "Email é obrigatório." }).email("Email inválido."),
    password: z.string({ required_error: "Senha é obrigatória." }).min(1, "Senha é obrigatória.")
});

export const registerSchema = z.object({
    name: z.string({ required_error: "Nome é obrigatório." }).min(3, "Nome deve ter no mínimo 3 caracteres."),
    email: z.string({ required_error: "Email é obrigatório." }).email("Email inválido."),
    password: z.string({ required_error: "Senha é obrigatória." }).min(6, "Senha deve ter no mínimo 6 caracteres.")
});

export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
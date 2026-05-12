import z from "zod";

export const loginSchema = z.object({
    email: z.email('Email é obrigatório'),
    password: z.string().min(1, 'Senha é obrigatória')
})

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.email('Email é obrigatório'),
    password: z.string().min(6, 'Senha deve conter ao menos 6 caracteres')
})

export type RegisterFormData = z.infer<typeof registerSchema>;
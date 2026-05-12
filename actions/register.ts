'use server'

import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { registerSchema } from "@/lib/validations/auth"
import bcrypt from 'bcryptjs'

export async function registerAction(values: unknown){
    const validatedFields = registerSchema.safeParse(values);

    if(!validatedFields.success){
        return {success: false, error: 'Dados Inválidos'}
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {success: false, error: 'Email já cadastrado'}
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return {success: 'Conta criada!'}
    } catch (error) {
        if(error instanceof Error){
            return {
                success: false, error: 'Erro ao criar conta. Tente novamente'
            }
        }

        return {success: false, error: 'Erro inesperado no servidor'}
    }
}
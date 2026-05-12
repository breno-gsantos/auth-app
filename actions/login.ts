'use server'

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";
import { loginSchema } from "@/lib/validations/auth"
import { AuthError } from "next-auth";

export async function loginAction(values: unknown){
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success){
        return {success: false, error: 'Dados Inválidos'}
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return {success: false, error: 'Credenciais Inválidas'}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        return {success: 'Bem-vindo!'}
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin':
                    return {success: false, error: 'Email ou senha inválidos'}
                default: 
                    return {success: false, error: 'Algo deu errado'}
            }
        }

        throw error;
    }
}
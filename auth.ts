import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from "@/lib/db";
import Credencials from 'next-auth/providers/credentials'
import { loginSchema } from "./lib/validations/auth";
import { getUserByEmail, getUserById } from "./lib/user";
import bcrypt from 'bcryptjs';
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credencials({
      async authorize(credentials){
        const validatedFields = loginSchema.safeParse(credentials);

        if(validatedFields.success){
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;

          const passwordMatches = await bcrypt.compare(password, user.password);

          if(passwordMatches) return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  callbacks: {
    async jwt({token}){
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role

      return token;
    },

    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(token.role && session.user){
        session.user.role = token.role
      }

      return session
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/'
  }
})
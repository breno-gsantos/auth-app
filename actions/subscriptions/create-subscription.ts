'use server'

import { auth } from "@/auth"
import prisma from "@/lib/db";
import { subscriptionSchema } from "@/lib/validations/subscription";
import { revalidatePath } from "next/cache";

export async function createSubscription(values: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return {success: false, error: 'Não autorizado'}
  }

  const validatedFiels = subscriptionSchema.safeParse(values);

  if (!validatedFiels.success) {
    return {success: false, error: 'Dados Inválidos'}
  }

  const { name, billingCycle, price, renewalDate, category, isActive } = validatedFiels.data;

  try {
    await prisma.subscription.create({
      data: {
        userId: session.user.id,

        name,
        price,
        billingCycle,
        category: category || null,
        renewalDate,
        isActive
      }
    });

    revalidatePath('/subscriptions')

    return {success: true, message: 'Assinatura criada com sucesso!'}
  } catch (error) {
    console.error(error);

    return {success: false, error: 'Erro ao criar assinatura'}
  }
}
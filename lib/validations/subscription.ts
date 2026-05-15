import z from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').max(15, 'Nome muito grande'),
  price: z.number().min(1, 'O preço deve ser maior ou igual a 1'),
  billingCycle: z.enum(['MONTHLY', 'YEARLY']),
  category: z.string().max(15, 'Categoria muito grande').optional().or(z.literal('')),
  renewalDate: z.date(),
  isActive: z.boolean().optional()
})

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
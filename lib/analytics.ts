import { Subscription } from "./generated/prisma/client";

export function getMonthlyTotal(subscriptions: Subscription[]): number {
  return subscriptions.filter((sub) => sub.isActive).reduce((total, sub) => {
    if (sub.billingCycle === 'MONTHLY') {
      return total + sub.price
    }

    return total + sub.price / 12
  }, 0)
}

export function getYearlyTotal(subscriptions: Subscription[]): number {
  return subscriptions.filter((sub) => sub.isActive).reduce((total, sub) => {
    if (sub.billingCycle === 'YEARLY') {
      return total + sub.price
    }

    return total + sub.price * 12
  }, 0)
}

export function getExpensesByCategory(
  subscriptions: Subscription[]
): { category: string; total: number }[] {
  const categoryTotals = subscriptions
    .filter(
      (sub): sub is Subscription & { category: string } =>
        sub.isActive && sub.category !== null
    )
    .reduce(
      (acc, sub) => {
        const monthlyPrice =
          sub.billingCycle === "MONTHLY"
            ? sub.price
            : sub.price / 12

        acc[sub.category] = (acc[sub.category] || 0) + monthlyPrice

        return acc
      },
      {} as Record<string, number>
    )

  return Object.entries(categoryTotals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

export function getMonthlyTrendData(subscriptions: Subscription[]) {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ]

  const currentMonth = new Date().getMonth()

  return Array.from({ length: 6 }, (_, index) => {
    const monthIndex = (currentMonth - 5 + index + 12) % 12

    const total = subscriptions
      .filter((sub) => sub.isActive)
      .reduce((acc, sub) => {
        const monthlyValue =
          sub.billingCycle === "MONTHLY"
            ? sub.price
            : sub.price / 12

        return acc + monthlyValue
      }, 0)

    return {
      month: months[monthIndex],
      gasto: total,
    }
  })
}
import { auth } from "@/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ArrowRight, CalendarDays, CreditCard, DollarSign, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login')
  }

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: session.user.id
    }
  })

  const recentSubscriptions = await prisma.subscription.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  })

  const monthlyTotal = subscriptions.reduce((acc, sub) => {
    if (sub.billingCycle === 'MONTHLY') {
      return acc + sub.price
    }

    return acc + sub.price / 12
  }, 0)

  const yearlyTotal = monthlyTotal * 12

  const activeCount = subscriptions.filter((sub) => sub.isActive).length

  const nextRenewal = subscriptions.filter((sub) => sub.isActive).sort((a, b) => 
    new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
  )[0]

  const categoryTotals = subscriptions.reduce((acc, sub) => {
    if (!sub.category) return acc;

    const monthlyValue = sub.billingCycle === 'MONTHLY' ? sub.price : sub.price / 12

    acc[sub.category] = (acc[sub.category] || 0) + monthlyValue

    return acc
  }, {} as Record<string, number>)


  const expensesByCategory = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      total
    })
  )

  const upcomingRenewals = subscriptions.filter((sub) => sub.isActive).sort((a, b) => 
    new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
  ).slice(0, 5)

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Sem categoria'

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const stats = [
  {
    title: "Gasto Mensal",
    value: formatCurrency(monthlyTotal),
    description: "Total recorrente mensal",
    icon: DollarSign,
  },

  {
    title: "Gasto Anual Estimado",
    value: formatCurrency(yearlyTotal),
    description: "Projeção para o ano",
    icon: TrendingUp,
  },

  {
    title: "Assinaturas Ativas",
    value: activeCount.toString(),
    description: `${subscriptions.length - activeCount} pausadas`,
    icon: CreditCard,
  },

  {
    title: "Próxima Cobrança",

    value: nextRenewal
      ? formatCurrency(nextRenewal.price)
      : "—",

    description: nextRenewal
      ? `${nextRenewal.name}`
      : "Nenhuma cobrança pendente",

    icon: CalendarDays,
  },
]

  return (
    <DashboardLayout title="Dashboard" user={session.user}>
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {stats.map(({ title, value, description, icon: Icon }) => (
            <StatCard
              key={title}
              title={title}
              value={value}
              description={description}
              icon={Icon}
            />
          ))}
        </div>

        <Card className="border-border/50 bg-linear-to-br from-accent/5 to-transparent backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
              <Sparkles className="size-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Insights do mês</p>
              <p className="text-sm text-muted-foreground">
                Você gastará{" "}
                <span className="font-semibold text-foreground">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(yearlyTotal)}
                </span>{" "}
                este ano. Sua maior categoria é{" "}
                <span className="font-semibold text-foreground">
                  {topCategory}
                </span>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <ExpenseChart data={expensesByCategory} />
          <UpcomingRenewals subscriptions={upcomingRenewals} />
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className='text-base font-medium'>Assinaturas Recentes</CardTitle>
            <Button variant='ghost' size='lg' asChild>
              <Link href='/subscriptions' className='gap-1 text-sm'>
                  Ver Todas
                  <ArrowRight className='size-4' />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className='space-y-3'>
            {recentSubscriptions.length > 0 ? (
              recentSubscriptions.map((sub) => (
                <SubscriptionCard key={sub.id} subscription={sub} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma assinatura encontrada.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
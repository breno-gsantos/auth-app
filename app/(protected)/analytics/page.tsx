import { auth } from "@/auth";
import { BillingCycleChart } from "@/components/analytics/billing-cycle-chart";
import { MonthlyTrend } from "@/components/analytics/monthly-trend";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { Card, CardContent } from "@/components/ui/card";
import { getExpensesByCategory, getMonthlyTotal, getMonthlyTrendData, getYearlyTotal } from "@/lib/analytics";
import prisma from "@/lib/db";

export default async function AnalyticsPage() {
  const session = await auth()

  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  const expensesByCategory = getExpensesByCategory(subscriptions)
  const monthlyTotal = getMonthlyTotal(subscriptions)
  const yearlyTotal = getYearlyTotal(subscriptions) 
  const monthlyTrendData = getMonthlyTrendData(subscriptions)

  return (
    <DashboardLayout title="Analytics" user={session?.user}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Média Mensal</p>
              <p className="mt-1 text-2xl font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(monthlyTotal)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Anual</p>
              <p className="mt-1 text-2xl font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(yearlyTotal)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Maior Categoria</p>
              <p className="mt-1 text-2xl font-semibold">
                {expensesByCategory[0]?.category || "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ExpenseChart data={expensesByCategory} />

          <BillingCycleChart subscriptions={subscriptions} />
        </div>

        <MonthlyTrend data={monthlyTrendData} />
      </div>
    </DashboardLayout>
  )
}
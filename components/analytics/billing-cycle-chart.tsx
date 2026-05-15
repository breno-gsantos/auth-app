'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/lib/generated/prisma/client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  subscriptions: Subscription[]
}

export function BillingCycleChart({subscriptions}: Props) {
  const cycleBreakdown = subscriptions.reduce(
    (acc, sub) => {
      if (sub.isActive) {
        if (sub.billingCycle === "MONTHLY") {
          acc.monthly += sub.price
        } else {
          acc.yearly += sub.price
        }
      }
      return acc
    },
    { monthly: 0, yearly: 0 }
  )

  const cycleData = [
    { name: "Mensais", value: cycleBreakdown.monthly, color: "hsl(160, 60%, 45%)" },
    { name: "Anuais", value: cycleBreakdown.yearly, color: "hsl(250, 60%, 55%)" },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">
          Por Ciclo de Cobrança
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cycleData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {cycleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
                formatter={(value) => [
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value)),
                  "Total mensal",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          {cycleData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
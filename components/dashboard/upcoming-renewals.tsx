"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, differenceInDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarClock } from "lucide-react"
import { Subscription } from "@/lib/generated/prisma/client"

interface UpcomingRenewalsProps {
  subscriptions: Subscription[]
}

export function UpcomingRenewals({ subscriptions }: UpcomingRenewalsProps) {
  const getDaysUntil = (date: Date) => {
    const days = differenceInDays(date, new Date())
    if (days === 0) return "Hoje"
    if (days === 1) return "Amanhã"
    return `${days} dias`
  }

  const getUrgencyColor = (date: Date) => {
    const days = differenceInDays(date, new Date())
    if (days <= 3) return "bg-red-500/10 text-red-500 border-red-500/20"
    if (days <= 7) return "bg-amber-500/10 text-amber-500 border-amber-500/20"
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base font-medium">
            Próximas Cobranças
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {subscriptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma cobrança nos próximos 30 dias.
          </p>
        ) : (
          subscriptions.slice(0, 5).map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                  <span className="text-sm font-semibold">
                    {sub.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(sub.renewalDate, "dd 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(sub.price)}
                </p>
                <Badge
                  variant="outline"
                  className={getUrgencyColor(sub.renewalDate)}
                >
                  {getDaysUntil(sub.renewalDate)}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

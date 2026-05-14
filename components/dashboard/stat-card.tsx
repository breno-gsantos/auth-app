import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  }
  className?: string;
}


export function StatCard({ title, value, icon: Icon, trend, className, description }: Props) {
  return (
    <Card className={cn('border-border/50 bg-card/50 backdrop-blur-sm', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>

            {trend && (
              <p className={cn('text-xs font-medium', trend.isPositive ? 'text-emerald-500' : 'text-red-500')}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% em relação ao mês passado
              </p>
            )}
          </div>
          <div className="rounded-lg bg-secondary p-2.5">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
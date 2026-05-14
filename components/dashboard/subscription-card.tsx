import { Card, CardContent } from "@/components/ui/card";
import { Subscription } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pause, Pencil, Play, Trash } from "lucide-react";

interface Props {
    subscription: Subscription;
    className?: string;
}

const categoryColors: Record<string, string> = {
  Entretenimento: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  Produtividade: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Desenvolvimento: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Armazenamento: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  Música: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "IA & Ferramentas": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Design: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Educação: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
}

export function SubscriptionCard({subscription, className}: Props){
    const monthlyPrice = subscription.billingCycle === 'MONTHLY' ? 
        subscription.price : subscription.price / 12

    return (
        <Card className={cn(
            'group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-border hover:bg-card',
                !subscription.isActive && 'opacity-60', className
            )}
        >
            <CardContent className="p-4">
                <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='size-10 flex items-center justify-center rounded-lg bg-secondary'>
                            <span className='text-lg font-semibold'>
                                {subscription.name.charAt(0)}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">{subscription.name}</p>
                                {!subscription.isActive && (
                                    <Badge variant='secondary' className="text-xs">
                                        Pausado
                                    </Badge>
                                )}
                            </div>

                            <div className='flex items-center gap-2'>
                                <Badge variant='outline' className={cn(
                                    'text-xs font-normal',
                                    subscription.category ? categoryColors[subscription.category] : 'bg-secondary'
                                )}>
                                    {subscription.category || 'Sem categoria'}
                                </Badge>
                                <Badge variant='outline' className="text-xs font-normal">
                                    {subscription.billingCycle === 'MONTHLY' ? 'Mensal' : 'Anual'}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="text-right">
                            <p className="font-semibold">
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(subscription.price)}
                                <span className="text-xs font-normal text-muted-foreground">
                                    /{subscription.billingCycle === 'MONTHLY' ? 'mês' : 'ano'}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Próxima cobrança:{" "}
                                {format(subscription.renewalDate, 'dd MMM', {locale: ptBR})}
                            </p>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' className="size-8 opacity-0 transition-opacity group-hover:opacity-100">
                                    <MoreHorizontal className='size-4' />
                                    <span className="sr-only">Abrir Menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-40'>
                                <DropdownMenuItem>
                                    <Pencil className="mr-2 size-4" />
                                    Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {subscription.isActive ? (
                                        <>
                                            <Pause className="mr-2 size-4" />
                                            Pausar
                                        </>
                                    ) : (
                                        <>
                                            <Play className='mr-2 size-4' />
                                            Reativar
                                        </>
                                    )}
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash className='mr-2 size-4' />
                                    Excluir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
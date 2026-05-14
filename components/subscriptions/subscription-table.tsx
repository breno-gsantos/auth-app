import { Subscription } from "@/lib/generated/prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pause, Pencil, Play, Trash2 } from "lucide-react"

interface Props {
    subscriptions: Subscription[]
}

const tableHeadData = [
    {title: 'Nome'},
    {title: 'Categoria'},
    {title: 'Ciclo'},
    {title: 'Preço'},
    {title: 'Próxima cobrança'},
    {title: 'Status'},
]

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

export function SubscriptionTable({subscriptions}: Props){
    return (
        <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableHeadData.map(({title}) => (
                            <TableHead key={title} className="text-muted-foreground">{title}</TableHead>
                        ))}
                        <TableHead className="w-12.5"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id} className={cn('border-border/50 transition-colors hover:bg-secondary/30', !sub.isActive && 'opacity-60')}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                                        <span className="text-sm font-semibold">
                                            {sub.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="font-medium">{sub.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn("font-normal", sub.category ? categoryColors[sub.category] : "bg-secondary" )}>
                                    {sub.category}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="font-normal">
                                    {sub.billingCycle === "MONTHLY" ? "Mensal" : "Anual"}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(sub.price)}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {format(sub.renewalDate, "dd MMM yyyy", { locale: ptBR })}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={sub.isActive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500" : "border-muted bg-muted/50 text-muted-foreground"}>
                                    {sub.isActive ? "Ativo" : "Pausado"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontal className="size-4" />
                                            <span className="sr-only">Abrir menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem>
                                            <Pencil className="mr-2 size-4" />
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            {sub.isActive ? (
                                                    <>
                                                        <Pause className="mr-2 size-4" />
                                                        Pausar
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="mr-2 size-4" />
                                                        Reativar
                                                    </>
                                            )}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                            <Trash2 className="mr-2 size-4" />
                                            Excluir
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
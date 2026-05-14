'use client'

import { LayoutGrid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Subscription } from "@/lib/generated/prisma/client"
import { useMemo, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SubscriptionTable } from "@/components/subscriptions/subscription-table"
import { SubscriptionCard } from "@/components/subscriptions/subscription-card"

interface Props {
    subscriptions: Subscription[]
}

export function Filter({subscriptions}: Props){
    const [search, setSearch] = useState<string>("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [viewMode, setViewMode] = useState<'table' | 'cards'>("table")

    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter((sub) => {
            const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase())

            const matchesCategory = categoryFilter === 'all' || sub.category === categoryFilter

            return matchesSearch && matchesCategory
        })
    }, [search, categoryFilter])

    return (
        <>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className="flex flex-1 gap-3">
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar assinatura..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-border/50 bg-secondary/50 pl-9" />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-45 border-border/50 bg-secondary/50">
                        <SelectValue placeholder='Categoria' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas as Categorias</SelectItem>
                        {subscriptions.map(({category}) => (
                            <SelectItem key={category} value={category!}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='flex items-center gap-1 rounded-lg border border-border/50 bg-secondary/30 p-1'>
                <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size='sm' className='h-8 px-3' onClick={() => setViewMode('table')}>
                    <List className='size-4' />
                    <span className="sr-only">Visualização em lista</span>
                </Button>
                <Button variant={viewMode === 'cards' ? 'secondary' : 'ghost'} size='sm' className="h-8 px-3" onClick={() => setViewMode('cards')}>
                    <LayoutGrid className="size-4" />
                    <span className="sr-only">Visualização em cards</span>
                </Button>
            </div>
        </div>
        <p className="text-sm text-muted-foreground">
            {filteredSubscriptions.length} assinatura
            {filteredSubscriptions.length !== 1 ? 's' : ""} encontrada
            {filteredSubscriptions.length !== 1 ? 's' : ""}
        </p>

        {filteredSubscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-16">
            <p className="text-muted-foreground">
              Nenhuma assinatura encontrada.
            </p>
            <Button variant="link" asChild className="mt-2">
              <Link href="/subscriptions/new">Adicionar primeira assinatura</Link>
            </Button>
          </div>
        ) : viewMode === "table" ? (
          <div className="hidden md:block">
            <SubscriptionTable subscriptions={filteredSubscriptions} />
          </div>
        ) : null}

        {filteredSubscriptions.length > 0 && (
          <div className={viewMode === "cards" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4 md:hidden"}>
            {filteredSubscriptions.map((sub) => (
              <SubscriptionCard key={sub.id} subscription={sub} />
            ))}
          </div>
        )}
        </>
    )
}
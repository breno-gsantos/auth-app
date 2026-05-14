'use client'

import { cn } from "@/lib/utils";
import { BarChart3, CreditCard, LayoutDashboard, Settings, Zap } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assinaturas", href: "/subscriptions", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Configurações", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-border/50 bg-sidebar">
      <div className="h-14 flex items-center gap-2 border-b border-border/50 px-4">
        <div className="size-8 flex items-center justify-center rounded-lg bg-accent">
          <Zap className="size-4 text-accent-foreground" />
        </div>
        <span className="text-base font-semibold tracking-tight">Renewly</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navigation.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link key={name} href={href} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground')}>
              <Icon className="size-4" />
              {name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        <div className="rounded-lg border border-border/50 bg-secondary/30 p-3">
          <p className="text-xs font-medium">Versão Free</p>
          <p className="mt-1 text-xs text-muted-foreground">Atualize para Pro e desbloqueie todas as funcionalidades.</p>
          <Link href='#' className="mt-2 inline-block text-xs font-medium text-accent hover:underline">
            Fazer Upgrade →
          </Link>
        </div>
      </div>
    </aside>
  )
}
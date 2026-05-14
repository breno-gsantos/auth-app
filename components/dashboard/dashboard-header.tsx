'use client'

import { Bell, LogOut, Search, Settings, User } from "lucide-react"
import { Session } from "next-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logoutAction } from "@/actions/logout"

interface Props {
  title?: string
  user: Session['user']
}

export function DashboardHeader({ user, title }: Props) {
  async function logout() {
    await logoutAction()
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {title && (
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar..." className="w-64 border-border/50 bg-secondary/50 pl-9 focus-visible:bg-secondary" />
          </div>

          <Button variant='ghost' size='icon' className="size-9 text-muted-foreground">
            <Bell className="size-4" />
            <span className="sr-only">Notificações</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className="h-9 gap-2 px-2 hover:bg-secondary">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline-block">{user?.name?.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={logout}>
                <LogOut className="mr-2 size-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
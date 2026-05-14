import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

type ButtonVariant = ComponentProps<typeof Button>['variant']

const navButtons: { title: string; href: string; variant: ButtonVariant}[] = [
  { title: 'Entrar', href: '/login', variant: 'ghost' },
  { title: 'Começar grátis', href: '/register', variant: 'default' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl h-14 flex items-center justify-between px-6">
        <Link href='/' className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
            <Zap className="size-4 text-accent-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">Renewly</span>
        </Link>

        <div className="flex items-center gap-3">
          {navButtons.map(({ href, title, variant }) => (
            <Button key={href} variant={variant} size='sm' asChild>
              <Link href={href}>{title}</Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import Link from "next/link";

type ButtonVariants = ComponentProps<typeof Button>['variant']

const heroButtons: { title: string; href: string;  variant: ButtonVariants}[] = [
  { title: 'Começar gratuitamente', href: '/register', variant: 'default' },
  { title: 'Ver demo', href: '/', variant: 'outline' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-150 `w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-28">
        <Badge variant='outline' className="mb-6 border-accent/30 bg-accent/10 text-accent">
          <Sparkles className="mr-1 size-3" />
          Novo: Alertas inteligentes com IA
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Elimine assinaturas
          <br />
          <span className="text-accent">desnecessárias</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Rastreie, gerencie e otimize todas as suas assinaturas em um só
          lugar. Descubra quanto você realmente gasta e economize dinheiro
          cancelando serviços que você nem usa.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {heroButtons.map(({ href, title, variant }) => (
            <Button key={href} variant={variant} size='lg' asChild>
              <Link href={href}>
                {title}
              </Link>
            </Button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">Sem cartão de crédito. Cancele quando quiser</p>
      </div>
    </section>
  )
}
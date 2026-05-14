import { benefits } from "@/constants/data";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefitsExamples = [
  { title: 'Netflix', letter: 'N', category: 'Entretenimento', price: '55,90', className: 'bg-pink-500/10 text-pink-500' },
  { title: 'Spotify', letter: 'S', category: 'Música', price: '21,90', className: 'bg-green-500/10 text-green-500' },
  { title: 'OpenAI', letter: 'O', category: 'IA & Ferramentas', price: '100,00', className: 'bg-amber-500/10 text-amber-500' },
]

export function Benefits() {
  return (
    <section className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Por que usar o Renewly?</h2>
            <p className="mt-4 text-muted-foreground">
              A maioria das pessoas gasta em média R$ 500 por mês em
              assinaturas e não sabe. Nós ajudamos você a recuperar o
              controle.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="size-5 shrink-0 text-accent" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 gap-2" asChild>
              <Link href='/register'>
                Começar Agora
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-accent/5 blur-2xl" />
            <div className="rounded-xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                {benefitsExamples.map(({ title, letter, category, price, className }) => (
                  <div key={title} className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-8 items-center justify-center rounded-md ${className} `}>
                        {letter}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-xs text-muted-foreground">{category}</p>
                      </div>
                    </div>

                    <p className="font-bold">R$ {price}/mês</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Mensal</p>
                  <p className="text-lg font-bold text-accent">R$ 177,80</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
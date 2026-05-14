import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Pronto para assumir o controle?</h2>
        <p className="mt-4 text-muted-foreground">
          Junte-se a milhares de usuários que já economizaram com o
          Renewly.
        </p>
        <Button size='lg' className="mt-8 gap-2" asChild>
          <Link href='/register'>
            Criar Conta Grátis
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
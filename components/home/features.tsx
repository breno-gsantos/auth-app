import { features } from "@/constants/data";

export function Features() {
  return (
    <section className="border-t border-border/50 bg-card/20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Tudo que você precisa para controlar seus gastos</h2>
          <p className="mt-4 text-muted-foreground">
            Ferramentas poderosas para gerenciar suas assinaturas de forma
            inteligente.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:bg-card">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                <Icon className="size-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
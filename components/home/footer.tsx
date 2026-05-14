import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex items-center justify-between max-w-6xl px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded bg-accent">
            <Zap className="size-3 text-accent-foreground" />
          </div>
          <span className="text-sm font-medium">Renewly</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 Renewly. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
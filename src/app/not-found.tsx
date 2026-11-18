import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh w-full place-items-center bg-background p-6 text-center">
      <div className="max-w-sm space-y-5">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <FileQuestion className="size-7" aria-hidden />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Página no encontrada</h1>
          <p className="mt-2 text-sm text-muted-foreground">Comprueba la dirección o vuelve al resumen del panel.</p>
        </div>
        <Link href="/" className={buttonVariants()}>
          <Home aria-hidden /> Volver a analítica
        </Link>
      </div>
    </main>
  );
}

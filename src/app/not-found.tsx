import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#F4F7F6] text-foreground text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shadow-md">
          <FileQuestion className="h-10 w-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">
            Error 404 · Ruta no encontrada
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Página Inexistente
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La página a la que intentas acceder no existe en esta plantilla o fue reubicada en otro módulo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 cursor-pointer shadow-sm">
              <Home className="h-4 w-4" />
              Ir al Dashboard
            </Button>
          </Link>
          <Link href="/states" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full text-xs font-semibold cursor-pointer">
              Ver Catálogo de Estados
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
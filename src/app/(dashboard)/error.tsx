"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="mx-auto my-8 max-w-lg border-destructive/30 bg-card shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-7" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight">
            No se pudo cargar este módulo
          </h2>
          <p className="text-xs text-muted-foreground">
            {error.message || "Ocurrió un error inesperado al renderizar la vista."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Button type="button" onClick={reset} className="gap-1.5 text-xs cursor-pointer">
            <RefreshCw className="size-3.5" aria-hidden />
            Reintentar
          </Button>
          <Link
            href="/"
            className={buttonVariants({ variant: "outline", size: "default", className: "gap-1.5 text-xs" })}
          >
            <Home className="size-3.5" aria-hidden />
            Volver al resumen
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

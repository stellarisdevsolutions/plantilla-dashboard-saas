"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WORK_STANDS } from "../data";
import { CheckSquare, Folder, Eye, Video } from "lucide-react";

export function WorkStandsCard() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Tareas":
        return <CheckSquare className="h-4 w-4 text-muted-foreground" />;
      case "Proyectos":
        return <Folder className="h-4 w-4 text-muted-foreground" />;
      case "Reseñas":
        return <Eye className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Video className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border/60 bg-card/90 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-sm font-bold tracking-tight text-foreground">
            Estado del trabajo
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Completado, en curso y en espera, en todos los proyectos activos.
          </CardDescription>
        </div>
        {/* Leyenda */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>Completado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>En curso</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span>En espera</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-1 px-6 pb-6">
        {WORK_STANDS.map((item) => {
          const donePct = (item.done / item.total) * 100;
          const movingPct = (item.moving / item.total) * 100;
          const waitingPct = (item.waiting / item.total) * 100;

          return (
            <div key={item.name} className="flex items-center gap-4 text-xs">
              {/* Icono y nombre */}
              <div className="flex items-center gap-2.5 w-24 shrink-0">
                {getIcon(item.name)}
                <span className="font-semibold text-foreground tracking-tight">{item.name}</span>
              </div>

              {/* Total numérico */}
              <div className="w-8 shrink-0 text-left font-mono font-bold text-foreground">
                {item.total}
              </div>

              {/* Barra cápsula gruesa */}
              <div className="flex-1 flex h-6 overflow-hidden rounded-full bg-muted/60 p-0.5 shadow-inner">
                <div
                  style={{ width: `${donePct}%` }}
                  className="bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-l-full flex items-center justify-center transition-all duration-500"
                  title={`Completado: ${item.done}`}
                />
                <div
                  style={{ width: `${movingPct}%` }}
                  className="bg-primary flex items-center justify-center transition-all duration-500"
                  title={`En curso: ${item.moving}`}
                />
                <div
                  style={{ width: `${waitingPct}%` }}
                  className="bg-[#24262f] rounded-r-full transition-all duration-500"
                  title={`En espera: ${item.waiting}`}
                />
              </div>

              {/* Badge restante */}
              <div className="w-8 shrink-0 text-right">
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted/80 px-2 font-mono text-[11px] font-semibold text-muted-foreground">
                  {item.remainingBadge}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

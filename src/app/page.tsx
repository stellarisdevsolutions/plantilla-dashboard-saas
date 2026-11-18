import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { WorkStandsCard } from "@/features/morlo/components/work-stands-card";
import { StudioAccountCard } from "@/features/morlo/components/studio-account-card";
import { TaskStatusCard } from "@/features/morlo/components/task-status-card";
import { StudioPulseCard } from "@/features/morlo/components/studio-pulse-card";
import { UpNextTasksCard } from "@/features/morlo/components/up-next-card";

export default function HomePage() {
  return (
    <DashboardShell>
      {/* Hero Greeting SaaS Banner */}
      <div className="relative overflow-hidden rounded-xl border border-border/80 bg-gradient-to-r from-card via-card to-emerald-50/50 dark:to-emerald-950/20 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide border border-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Panel de Control · Morlo Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Buenos días, Dara
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            9 tareas en tu lista · 4 sesiones programadas en el estudio hoy
          </p>
        </div>

        {/* Indicadores rápidos de estado SaaS */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-lg border border-border/60 bg-background/80 px-3.5 py-2 text-left hidden sm:block">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Sesiones de hoy
            </span>
            <span className="text-sm font-extrabold text-foreground font-mono">4 activas</span>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/80 px-3.5 py-2 text-left hidden sm:block">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Rendimiento
            </span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              +18.4%
            </span>
          </div>
        </div>
      </div>

      {/* Fila 1: Estado del trabajo (Cápsulas gruesas) + Cuenta del estudio */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <WorkStandsCard />
        </div>
        <div className="lg:col-span-4">
          <StudioAccountCard />
        </div>
      </div>

      {/* Fila 2: Estado de tareas (Dona) + Ritmo del estudio (Curva) + Próximas para ti (Lista) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 xl:col-span-4">
          <TaskStatusCard />
        </div>
        <div className="lg:col-span-5 xl:col-span-5">
          <StudioPulseCard />
        </div>
        <div className="lg:col-span-3 xl:col-span-3">
          <UpNextTasksCard />
        </div>
      </div>
    </DashboardShell>
  );
}

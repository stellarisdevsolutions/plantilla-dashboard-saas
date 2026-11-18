"use client";

import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ReputationScoreCard } from "@/features/reviews/components/reputation-score-card";
import { StarMixCard } from "@/features/reviews/components/star-mix-card";
import { RavenoKpiCards } from "@/features/reviews/components/raveno-kpi-cards";
import { DailyReviewsChartCard } from "@/features/reviews/components/daily-reviews-chart-card";
import { NeedsReplyCard } from "@/features/reviews/components/needs-reply-card";

export default function ReviewsPage() {
  const [selectedKpi, setSelectedKpi] = React.useState("new-reviews");

  return (
    <DashboardShell>
      {/* Encabezado del módulo de Reseñas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Mesa de Operaciones · Handwell
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Mesa de Reseñas
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            16 reseñas esperan respuesta · 43 en verificación · Calificación promedio 4.44/5
          </p>
        </div>
      </div>

      {/* Fila 1: Puntuación de reputación + Distribución de estrellas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ReputationScoreCard />
        </div>
        <div className="lg:col-span-4">
          <StarMixCard />
        </div>
      </div>

      {/* Fila 2: 4 Tarjetas KPI interactivas con Sparklines */}
      <RavenoKpiCards selectedId={selectedKpi} onSelect={setSelectedKpi} />

      {/* Fila 3 (2 columnas exactas de Raveno): Gráfico de barras de 14 días + Cola de respuestas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <DailyReviewsChartCard />
        </div>
        <div className="lg:col-span-6">
          <NeedsReplyCard />
        </div>
      </div>
    </DashboardShell>
  );
}

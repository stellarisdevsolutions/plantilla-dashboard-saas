"use client";

import * as React from "react";
import { PageHeading } from "@/components/layout/page-heading";
import { ReputationScoreCard } from "@/features/reviews/components/reputation-score-card";
import { StarMixCard } from "@/features/reviews/components/star-mix-card";
import { ReviewMetrics } from "@/features/reviews/components/review-metrics";
import { DailyReviewsChartCard } from "@/features/reviews/components/daily-reviews-chart-card";
import { NeedsReplyCard } from "@/features/reviews/components/needs-reply-card";

export default function ReviewsPage() {
  const [selectedKpi, setSelectedKpi] = React.useState("new-reviews");

  return (
    <>
      <PageHeading title="Reseñas" description="Consulta las valoraciones y responde a comentarios de ejemplo." />

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
      <ReviewMetrics selectedId={selectedKpi} onSelect={setSelectedKpi} />

      {/* Fila 3: Gráfico de barras de 14 días + Cola de respuestas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <DailyReviewsChartCard />
        </div>
        <div className="lg:col-span-6">
          <NeedsReplyCard />
        </div>
      </div>
    </>
  );
}

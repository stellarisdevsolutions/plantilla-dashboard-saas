"use client";

import { useHydrated } from "@/lib/use-hydrated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { REVIEW_DEMO_DATA } from "../data";
import { Star, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export function ReputationScoreCard() {
  const mounted = useHydrated();

  return (
    <Card className="border-border/60 bg-card/95 shadow-sm rounded-xl overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-3 gap-4">
        <div>
          <CardTitle className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            Puntuación de reputación • Noviembre
          </CardTitle>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-4xl sm:text-5xl font-black tracking-tight font-sans text-foreground">
              {REVIEW_DEMO_DATA.reputationScore}
            </span>
            <span className="text-sm font-bold text-muted-foreground">/{REVIEW_DEMO_DATA.maxScore}</span>
            <div className="flex items-center text-warning gap-0.5 ml-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
              ))}
              <Star className="h-3.5 w-3.5 fill-warning/40 text-warning" />
            </div>
            <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary ml-1">
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
              {REVIEW_DEMO_DATA.scoreChange}
            </span>
          </div>
        </div>

        {/* 3 Estadísticas en cabecera */}
        <div className="flex items-center gap-5 sm:gap-7 text-right">
          <div>
            <span className="text-base font-extrabold font-mono text-foreground block">
              {REVIEW_DEMO_DATA.reviewsThisMonth}
            </span>
            <span className="text-[11px] text-muted-foreground block font-medium">Reseñas este mes</span>
          </div>
          <div>
            <span className="text-base font-extrabold font-mono text-foreground block">
              {REVIEW_DEMO_DATA.answeredPercentage}
            </span>
            <span className="text-[11px] text-muted-foreground block font-medium">Respondidas</span>
          </div>
          <div>
            <span className="text-base font-extrabold font-mono text-foreground block">
              {REVIEW_DEMO_DATA.medianReplyTime}
            </span>
            <span className="text-[11px] text-muted-foreground block font-medium">Tiempo medio</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 px-6 pb-6">
        <div className="h-36 w-full min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={140} debounce={50}>
              <AreaChart data={REVIEW_DEMO_DATA.scoreHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="reputationGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.16} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis
                  domain={[3.8, 4.6]}
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => v.toFixed(1)}
                  opacity={0.7}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border bg-popover/95 px-3 py-1.5 text-xs shadow-lg backdrop-blur-md">
                          <span className="font-semibold text-foreground">{label}: </span>
                          <span className="font-mono text-primary font-bold">{payload[0].value} ★</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#reputationGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-2xl bg-muted/20 animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useHydrated } from "@/lib/use-hydrated";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { REVIEW_DEMO_DATA } from "../data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

export function DailyReviewsChartCard() {
  const mounted = useHydrated();

  return (
    <Card className="border-border/60 bg-card/95 shadow-sm rounded-xl overflow-hidden h-full flex flex-col justify-between">
      <CardHeader className="flex flex-col pb-2">
        <CardTitle className="text-sm font-bold tracking-tight text-foreground">
          Nuevas reseñas · últimos 14 días
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5 font-medium">
          27 Oct — hoy · selecciona una tarjeta superior
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 px-6 pb-6 flex-1">
        <div className="h-44 w-full min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={150} debounce={50}>
              <BarChart
                data={REVIEW_DEMO_DATA.dailyReviews14Days}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border bg-popover/95 px-3 py-1.5 text-xs shadow-lg backdrop-blur-md">
                          <span className="font-semibold text-foreground">{label}: </span>
                          <span className="font-mono text-primary font-bold">
                            {payload[0].value} reseñas
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {REVIEW_DEMO_DATA.dailyReviews14Days.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.isToday ? "var(--primary)" : "var(--border)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-2xl bg-muted/20 animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

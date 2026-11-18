"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { STUDIO_PULSE } from "../data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export function StudioPulseCard() {
  const [activeFilter, setActiveFilter] = React.useState("7 días");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filterOptions = ["Todo el equipo", "7 días", "4 semanas", "6 meses"];

  return (
    <Card className="border-border/60 bg-card/90 shadow-sm rounded-xl overflow-hidden h-full flex flex-col justify-between">
      <CardHeader className="flex flex-col gap-2.5 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-bold tracking-tight text-foreground">
              Ritmo del estudio
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Horas registradas vs capacidad total
            </CardDescription>
          </div>

          {/* Píldoras de filtro */}
          <div className="flex items-center gap-0.5 rounded-full border border-border/70 bg-muted/40 p-0.5">
            {filterOptions.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`h-6 px-2.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-1 px-6 pb-6">
        {/* Cabecera de métricas */}
        <div className="flex items-baseline gap-2 text-xs">
          <span className="text-2xl font-black font-sans text-foreground">
            {STUDIO_PULSE.hoursLogged} h
          </span>
          <span className="text-muted-foreground font-medium">de {STUDIO_PULSE.capacity} h capacidad</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-primary font-bold">{STUDIO_PULSE.percentageBooked}% ocupado</span>
        </div>

        {/* Gráfico */}
        <div className="h-44 w-full min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={150} debounce={50}>
              <AreaChart data={STUDIO_PULSE.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}h`}
                  opacity={0.7}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-border bg-popover/95 px-3 py-1.5 text-xs shadow-lg backdrop-blur-md">
                          <span className="font-semibold text-foreground">{label}: </span>
                          <span className="font-mono text-primary font-bold">{payload[0].value} horas</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#pulseGradient)"
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

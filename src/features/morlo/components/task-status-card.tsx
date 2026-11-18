"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TASK_STATUS_BREAKDOWN } from "../data";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

export function TaskStatusCard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Completadas", value: 45, color: "#18181b" },
    { name: "En progreso", value: 14, color: "var(--primary)" },
    { name: "En revisión", value: 5, color: "#a1a1aa" },
    { name: "Por iniciar", value: 16, color: "#3f3f46" },
  ];

  return (
    <Card className="border-border/60 bg-card/90 shadow-sm rounded-xl overflow-hidden h-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-bold tracking-tight text-foreground">
            Estado de tareas
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            80 tareas en trabajos activos
          </CardDescription>
        </div>
        <button
          type="button"
          onClick={() => toast.info("Tablero Kanban", { description: "Abriendo vista completa de tareas." })}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          Tablero ↗
        </button>
      </CardHeader>
      <CardContent className="pt-2 px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Gráfico de dona con etiqueta central */}
          <div className="relative h-32 w-32 shrink-0 flex items-center justify-center">
            {mounted ? (
              <PieChart width={128} height={128}>
                <Pie
                  data={data}
                  cx={64}
                  cy={64}
                  innerRadius={38}
                  outerRadius={54}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <div className="h-full w-full rounded-full bg-muted/20 animate-pulse" />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-black font-sans text-foreground">56%</span>
              <span className="text-[8px] uppercase tracking-wider font-bold text-muted-foreground">hecho</span>
            </div>
          </div>

          {/* Desglose de estados */}
          <div className="flex-1 w-full space-y-2 text-xs">
            {TASK_STATUS_BREAKDOWN.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground font-medium">{item.label}</span>
                </div>
                <span className="font-mono font-semibold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

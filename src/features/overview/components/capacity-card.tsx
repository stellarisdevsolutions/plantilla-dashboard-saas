import { Gauge } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DEMO_ACTIVITY } from "../data";

export function CapacityCard() {
  const { hoursLogged, capacity, percentageBooked } = DEMO_ACTIVITY;

  return (
    <Card className="relative isolate flex min-w-0 flex-col overflow-hidden rounded-xl bg-primary text-primary-foreground">
      <div aria-hidden className="pointer-events-none absolute -end-7 -top-12 -z-10 size-44 rotate-12 rounded-full border-[18px] border-current opacity-10" />
      <CardHeader className="flex flex-row items-center gap-2 p-4 sm:px-5">
        <Gauge aria-hidden className="size-4" />
        <h2 className="text-sm font-semibold">Capacidad semanal</h2>
      </CardHeader>
      <CardContent className="mt-auto space-y-4 px-4 pb-5 sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">{hoursLogged} h</span>
          <span className="text-xs opacity-90">de {capacity} h disponibles</span>
        </div>
        <div className="space-y-2">
          <div
            role="progressbar"
            aria-label="Capacidad semanal utilizada"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentageBooked}
            className="h-2 overflow-hidden rounded-full bg-primary-foreground/25"
          >
            <div className="h-full rounded-full bg-primary-foreground" style={{ width: `${percentageBooked}%` }} />
          </div>
          <p className="text-xs opacity-90">{percentageBooked}% de capacidad utilizada</p>
        </div>
      </CardContent>
    </Card>
  );
}

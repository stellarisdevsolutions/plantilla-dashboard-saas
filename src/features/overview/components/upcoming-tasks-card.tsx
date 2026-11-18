"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DEMO_UPCOMING_TASKS } from "../data";

export function UpcomingTasksCard() {
  const [completed, setCompleted] = useState<string[]>([]);

  return (
    <Card className="min-w-0 rounded-xl">
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-4 sm:px-5">
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold">Tareas próximas</h2>
          <CardDescription>Seguimiento de ejemplo</CardDescription>
        </div>
        <span aria-live="polite" className="shrink-0 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
          {completed.length}/{DEMO_UPCOMING_TASKS.length} hechas
        </span>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">
        <ul className="divide-y divide-border">
          {DEMO_UPCOMING_TASKS.map(({ id, title, due }) => {
            const checked = completed.includes(id);
            return (
              <li key={id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-2.5 hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const selected = event.target.checked;
                      setCompleted((current) => selected ? [...current, id] : current.filter((taskId) => taskId !== id));
                    }}
                    className="size-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0 space-y-1">
                    <span className={cn("block text-xs font-medium", checked && "text-muted-foreground line-through")}>{title}</span>
                    <span className="block text-xs text-muted-foreground">{due}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

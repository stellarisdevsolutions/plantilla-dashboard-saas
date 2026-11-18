"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UP_NEXT_TASKS } from "../data";
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function UpNextTasksCard() {
  const [tasks, setTasks] = React.useState(UP_NEXT_TASKS);

  const toggleTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    toast.success("Estado de tarea actualizado", {
      description: `"${title}"`,
    });
  };

  return (
    <Card className="border-border/60 bg-card/90 shadow-sm rounded-xl h-full flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-sm font-bold tracking-tight text-foreground">
            Próximas para ti
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5 font-medium">
            Marca una para moverla a Completadas
          </CardDescription>
        </div>
        <span className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          Ver todas 16 ↗
        </span>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-1 px-6 pb-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id, task.title)}
            className="flex items-center justify-between p-2.5 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                  task.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/40 hover:border-foreground"
                }`}
                aria-label="Marcar como completada"
              >
                {task.completed && <Check className="h-2.5 w-2.5 stroke-[3]" />}
              </button>
              <span
                className={`text-xs font-medium truncate transition-all ${
                  task.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-border/60 bg-card/80">
                {task.tag}
              </Badge>
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground font-mono">
                <Clock className="h-2.5 w-2.5" />
                {task.due}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

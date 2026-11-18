import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AdvancedDataTable } from "@/features/crud-table/components/data-table";

export default function TablePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-1 pb-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Tabla CRUD Avanzada
        </h1>
        <p className="text-xs text-muted-foreground">
          Paginación, filtros en memoria o servidor, selección múltiple y formularios con validación Zod
        </p>
      </div>
      <AdvancedDataTable />
    </DashboardShell>
  );
}

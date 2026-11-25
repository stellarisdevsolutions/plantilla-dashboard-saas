import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PageHeading } from "@/components/layout/page-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersTable } from "@/features/users/components/users-table";

function UsersTableFallback() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Cargando tabla de usuarios">
      <Skeleton className="h-10 w-full rounded-lg" />
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function TablePage() {
  return (
    <div className="module-page">
      <PageHeading
        title="Tablas y grids"
        description="Tabla de usuarios con filtros en URL, detalle lateral y edición de registros."
      />

      {/* NuqsAdapter y TanStack Table quedan dentro de Suspense para no bloquear prerender. */}
      <Suspense fallback={<UsersTableFallback />}>
        <NuqsAdapter>
          <UsersTable />
        </NuqsAdapter>
      </Suspense>
    </div>
  );
}

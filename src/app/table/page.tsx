import { PageHeading } from "@/components/layout/page-heading";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { UsersTable } from "@/features/users/components/users-table";

export default function TablePage() {
  return (
    <DashboardShell>
      <div className="module-page">
      <PageHeading title="Tablas y grids" description="Tabla de usuarios con búsqueda, ordenación y edición de registros." />

      <UsersTable />
    </div>
    </DashboardShell>
  );
}

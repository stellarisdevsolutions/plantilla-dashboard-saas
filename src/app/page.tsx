import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProjectOverview } from "@/features/overview/components/project-overview";

export default function HomePage() {
  return <DashboardShell><ProjectOverview /></DashboardShell>;
}

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProjectOverview } from "@/features/overview/components/project-overview";

export default function ProjectsPage() {
  return <DashboardShell><ProjectOverview /></DashboardShell>;
}

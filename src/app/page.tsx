import { DashboardShell } from "@/components/layout/dashboard-shell";
import { InvoiceDashboard } from "@/features/invoices/invoice-dashboard";
import "@/features/invoices/invoices.css";

export default function HomePage() {
  return <DashboardShell><InvoiceDashboard /></DashboardShell>;
}

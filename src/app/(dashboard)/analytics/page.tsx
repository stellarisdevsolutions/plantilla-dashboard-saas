import { AnalyticsDashboard } from "@/features/analytics/analytics-dashboard";
import { demoMonths } from "@/features/analytics/data";
import { InvoiceDashboard } from "@/features/invoices/invoice-dashboard";
import "@/features/invoices/invoices.css";
import "@/features/analytics/analytics.css";

export default function AnalyticsPage() {
  return (
    <div className="billing-analytics">
      <InvoiceDashboard />
      <AnalyticsDashboard months={demoMonths} />
    </div>
  );
}

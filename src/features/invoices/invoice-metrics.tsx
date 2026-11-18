import { AlarmClock, ArrowDownLeft, ArrowUpRight, CalendarDays, Clock3, Wallet } from "lucide-react";
import { currency, daysToCollect, monthlyBilling, reportDate, total, type Invoice } from "./data";

export function InvoiceMetrics({ invoices }: { invoices: Invoice[] }) {
  const outstanding = invoices.filter(i => i.status === "Pendiente");
  const overdue = outstanding.filter(i => i.due < reportDate);
  const upcoming = outstanding.filter(i => i.due >= reportDate && i.due <= "2026-12-18");
  const sum = (rows: Invoice[]) => rows.reduce((value, row) => value + total(row), 0);
  const peak = Math.max(...monthlyBilling.map(m => m.amount));
  const latest = daysToCollect[daysToCollect.length - 1];
  const points = daysToCollect.map((days, i) => [7 + i * 226 / (daysToCollect.length - 1), 84 - days * 2.3]);
  const line = points.map(p => p.join(",")).join(" ");
  return (
    <section className="iv-metrics" aria-label="Indicadores de facturación">
      <article className="iv-metric iv-desk">
        <div className="iv-metric-label"><h2>Importe vencido</h2><AlarmClock /></div>
        <strong>{currency(sum(overdue))}</strong>
        <small><ArrowUpRight /> {overdue.length} {overdue.length === 1 ? "factura por cobrar" : "facturas por cobrar"}</small>
        <div className="iv-desk-art" aria-hidden />
      </article>
      <article className="iv-metric">
        <div className="iv-metric-label"><h2>Próximos 30 días</h2><CalendarDays /></div>
        <strong>{currency(sum(upcoming))}</strong>
        <small>{upcoming.length} facturas pendientes</small>
        <div className="iv-bars" aria-label="Facturación mensual de junio a noviembre">
          {monthlyBilling.map(({month, amount}) => <div key={month} title={month + " · " + currency(amount)}><i style={{height: (amount / peak * 80) + "%"}} /><span>{month}</span><span className="sr-only">{currency(amount)}</span></div>)}
        </div>
      </article>
      <article className="iv-metric">
        <div className="iv-metric-label"><h2>Tiempo medio de cobro</h2><Clock3 /></div>
        <strong>{latest} <em>días</em></strong>
        <small><ArrowDownLeft /> {daysToCollect.at(-2)! - latest} días menos que en octubre</small>
        <svg className="iv-line" viewBox="0 0 240 90" preserveAspectRatio="none" role="img" aria-label="El plazo de cobro baja de 31 a 16 días">
          <defs><linearGradient id="billing-area" x1="0" x2="0" y1="0" y2="1"><stop stopColor="var(--primary)" stopOpacity=".24" /><stop offset="1" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs>
          <polygon points={line + " 233,90 7,90"} fill="url(#billing-area)" />
          <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="2" />
          {points.map(([x,y]) => <circle key={x} cx={x} cy={y} r="2.8" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.7" />)}
        </svg>
      </article>
      <article className="iv-metric iv-wallet">
        <div className="iv-metric-label"><h2>Importe cobrado</h2><Wallet /></div>
        <strong>{currency(sum(invoices.filter(i => i.status === "Pagada")))}</strong>
        <small>Cuentas de cobro</small>
        <div className="iv-bank-cards" aria-label="Cuentas de demostración">
          {[["4242","Visa"],["6789","Stripe"],["1234","PayPal"]].map(([digits, name]) => <div key={digits}><b>•••• {digits}</b><span>{name}</span></div>)}
        </div>
      </article>
    </section>
  );
}

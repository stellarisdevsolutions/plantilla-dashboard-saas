"use client";

import { useId, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, ChartNoAxesCombined, ChevronDown, CircleDollarSign, CalendarDays, Crosshair, Filter, PieChart, Repeat2, Star, Timer, MousePointer2, UsersRound } from "lucide-react";
import { acquired, ratio, summarize, type MonthlyMetrics } from "./data";

const number = new Intl.NumberFormat("es-ES", {useGrouping: "always", maximumFractionDigits: 0});
const money = new Intl.NumberFormat("es-ES", {style: "currency", currency: "USD", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0});
const decimal = new Intl.NumberFormat("es-ES", {maximumFractionDigits: 1});
const monthFormat = new Intl.DateTimeFormat("es", {month: "short", timeZone: "UTC"});
const shortMonth = (month: string) => monthFormat.format(new Date(month + "-01T00:00:00Z")).replace(".","");
const dateLabel = (month: string) => shortMonth(month) + " " + month.slice(0,4);
const percent = (value: number | null) => value === null ? "—" : decimal.format(value * 100) + " %";

function Sparkline({ values }: { values: number[] }) {
  const low = Math.min(...values);
  const range = Math.max(...values) - low || 1;
  const points = values.map((value, i) => [3 + i * 88 / Math.max(1, values.length - 1), 30 - (value - low) / range * 23].join(","));
  return <svg className="an-spark" viewBox="0 0 94 36" aria-hidden><polygon points={points.join(" ") + " 91,35 3,35"} fill="currentColor" opacity=".09" /><polyline points={points.join(" ")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}

function Delta({ value, prior, points = false }: { value: number | null; prior: number | null; points?: boolean }) {
  if (prior === null || value === null || (!points && prior === 0)) return <small>Sin base comparable</small>;
  const delta = points ? (value - prior) * 100 : (value - prior) / Math.abs(prior) * 100;
  const Icon = delta >= 0 ? ArrowUpRight : ArrowDownRight;
  return <small className="an-delta" data-negative={delta < 0}><Icon size={13} aria-hidden />{delta > 0 ? "+" : ""}{decimal.format(delta)} {points ? "pp" : "%"}</small>;
}

function Evolution({ rows }: { rows: MonthlyMetrics[] }) {
  const [metric, setMetric] = useState<"revenue" | "costs">("revenue");
  const [chosen, setChosen] = useState("");
  const fillId = useId();
  const selected = rows.find(row => row.month === chosen) ?? rows[rows.length - 1];
  const highest = Math.max(1, ...rows.map(row => row[metric]));
  const unit = 10 ** Math.floor(Math.log10(highest));
  const ceiling = Math.ceil(highest / unit) * unit;
  const height = 140;
  const points = rows.map((row, i) => ({
    x: (i + 0.5) / rows.length * 1000,
    y: height * (1 - row[metric] / ceiling),
  }));
  const line = points.map(({ x, y }) => x + "," + y).join(" ");
  const first = points[0];
  const last = points[points.length - 1];

  return <article className="an-card an-evolution">
    <header><h3>Evolución financiera</h3>
      <select aria-label="Serie financiera" value={metric} onChange={event => setMetric(event.target.value as typeof metric)}>
        <option value="revenue">Ingresos</option><option value="costs">Costes</option>
      </select>
    </header>
    <div className="an-reading" aria-live="polite"><strong>{money.format(selected[metric])}</strong><span>{dateLabel(selected.month)}</span></div>
    <div className="an-graph">
      <div className="an-axis" aria-hidden>{[ceiling, ceiling / 2, 0].map(value => <span key={value}>{number.format(value)}</span>)}</div>
      <div className="an-series">
        <svg viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--primary)" stopOpacity=".26" /><stop offset="1" stopColor="var(--primary)" stopOpacity=".015" /></linearGradient></defs>
          {[0, height / 2, height].map(y => <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="var(--border)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />)}
          <polygon points={first.x + "," + height + " " + line + " " + last.x + "," + height} fill={`url(#${fillId})`} />
          <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="2.8" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="an-bars">{rows.map((row, i) => <button key={row.month} aria-label={dateLabel(row.month) + ", " + money.format(row[metric])} aria-pressed={row === selected} onClick={() => setChosen(row.month)}>
          <i aria-hidden style={{top: points[i].y / height * 100 + "%"}}/><small>{shortMonth(row.month)}</small>
        </button>)}</div>
      </div>
    </div>
  </article>;
}

function TargetGauge({ progress }: { progress: number | null }) {
  const steps = 38;
  const filled = Math.round(Math.min(1, Math.max(0, progress ?? 0)) * steps);
  return <div className="an-gauge">
    <svg viewBox="0 0 240 126" aria-hidden>
      {Array.from({ length: steps }, (_, index) => <line key={index}
        x1="18" x2="37" y1="113" y2="113"
        transform={`rotate(${index * 180 / (steps - 1)} 120 113)`}
        stroke={index < filled ? "var(--brand-light)" : "var(--inverse-border)"}
        strokeWidth="4" strokeLinecap="round" />)}
    </svg>
    <div><strong>{percent(progress)}</strong><small>de la meta</small></div>
  </div>;
}

export function AnalyticsDashboard({ months }: { months: MonthlyMetrics[] }) {
  const [period, setPeriod] = useState(6);
  const rows = months.slice(-period);
  if (!rows.length) return <section className="analytics"><h2>Analítica y KPIs</h2><p>Aún no hay datos para este periodo.</p></section>;
  const current = summarize(rows);
  const previousRows = months.slice(-period * 2, -period);
  const previous = previousRows.length === period ? summarize(previousRows) : null;
  const progress = ratio(current.revenue, current.target);
  const kpis = [
    { title: "Ingresos", icon: CircleDollarSign, value: money.format(current.revenue), raw: current.revenue, prior: previous?.revenue, values: rows.map(r => r.revenue) },
    { title: "Margen operativo", icon: ChartNoAxesCombined, value: percent(current.margin), raw: current.margin, prior: previous?.margin, points: true, values: rows.map(r => ratio(r.revenue-r.costs, r.revenue) ?? 0) },
    { title: "Nuevos clientes", icon: UsersRound, value: number.format(current.customers), raw: current.customers, prior: previous?.customers, values: rows.map(acquired) },
    { title: "Conversión", icon: MousePointer2, value: percent(current.conversion), raw: current.conversion, prior: previous?.conversion, points: true, values: rows.map(r => ratio(acquired(r), r.prospects) ?? 0) },
  ];
  const stages = [["Prospectos",current.prospects],["Cualificados",current.qualified],["Clientes",current.customers]] as const;
  const detail = [
    ["Beneficio operativo",money.format(current.profit),"Ingresos menos costes operativos."],
    ["Importe medio por operación",current.avgOrder === null ? "—" : money.format(current.avgOrder),"Ingresos divididos entre operaciones."],
    ["Abandono mensual",percent(current.churn),"Bajas del mes sobre la base inicial, ponderadas por el tamaño de esa base."],
    ["Utilización de capacidad",percent(current.utilization),"Horas utilizadas sobre horas disponibles."],
    ["Operaciones comerciales",number.format(current.orders),"Número total de operaciones del periodo."],
    ["Entregas completadas",number.format(current.completed),"Total de entregas realizadas durante el periodo."],
  ];
  const channelColors = ["var(--brand-pigment)", "var(--brand-light)", "var(--muted-foreground)", "var(--border)"];
  let channelOffset = 0;
  const channelStops = current.channels.map(({value}, index) => {
    const start = channelOffset;
    channelOffset += (ratio(value, current.customers) ?? 0) * 100;
    return `${channelColors[index]} ${start}% ${channelOffset}%`;
  });
  const health = [
    { title: "Retención mensual", icon: Repeat2, score: current.retention, description: "Clientes que continúan de un mes al siguiente." },
    { title: "Satisfacción del cliente", icon: Star, score: current.csat, description: "4 o 5 estrellas · " + number.format(current.responses) + " respuestas" },
    { title: "Entregas a tiempo", icon: Timer, score: current.onTime, description: number.format(current.completed) + " entregas completadas" },
  ];

  return <section className="analytics" aria-labelledby="analysis-title">
    <div className="an-heading"><div><h2 id="analysis-title">Analítica y KPIs</h2><p><CalendarDays size={14} aria-hidden />{dateLabel(rows[0].month)} – {dateLabel(rows[rows.length-1].month)} · USD · Datos de ejemplo</p></div>
      <div className="an-period" role="group" aria-label="Periodo de analítica">{[3,6,12].map(n => <button key={n} aria-pressed={period === n} onClick={() => setPeriod(n)}>{n} meses</button>)}</div>
    </div>
    <div className="an-summary">{kpis.map(({title,icon:Icon,value,raw,prior,points,values}) => <article className="an-kpi" key={title}>
      <h3><Icon size={15} aria-hidden />{title}</h3><strong>{value}</strong>
      <div className="an-kpi-foot"><div><Delta value={raw} prior={prior ?? null} points={points}/><span>vs. periodo anterior</span></div><Sparkline values={values}/></div>
    </article>)}</div>
    <div className="an-trends"><Evolution rows={rows}/>
      <article className="an-card an-goal"><header><h3>Objetivo de ingresos</h3><Crosshair size={17} aria-hidden/></header>
        <TargetGauge progress={progress}/>
        <div className="an-goal-foot"><div><span>Ingresos</span><b>{money.format(current.revenue)}</b></div><div><span>Meta del periodo</span><b>{money.format(current.target)}</b></div></div>
      </article>
    </div>
    <div className="an-distribution">
      <article className="an-card"><header><h3>Embudo de adquisición</h3><Filter size={16} aria-hidden/></header><div className="an-funnel">{stages.map(([title,value]) => <div key={title}>
        <div className="an-stage-head"><span>{title}</span><b>{number.format(value)}</b></div>
        <div className="an-stage-meter"><div className="an-track"><i style={{width:percentWidth(value,current.prospects)}}/></div><small>{percent(ratio(value,current.prospects))}</small></div>
      </div>)}</div></article>
      <article className="an-card"><header><h3>Canales de captación</h3><PieChart size={16} aria-hidden/></header><div className="an-channel-body">
        <div className="an-donut" style={{background: current.customers ? `conic-gradient(${channelStops.join(", ")})` : "var(--border)"}}>
          <div><strong>{number.format(current.customers)}</strong><small>clientes</small></div>
        </div>
        <ul className="an-channels">{current.channels.map(({label,value}, index) => <li key={label}><i style={{background:channelColors[index]}}/><span>{label}</span><b>{number.format(value)}</b><small>{percent(ratio(value,current.customers))}</small></li>)}</ul>
      </div></article>
    </div>
    <div className="an-health">{health.map(({ title, icon: Icon, score, description }) => <article className="an-card" key={title}>
      <h3><Icon size={16} aria-hidden />{title}</h3><strong>{percent(score)}</strong><div className="an-track" aria-hidden><i style={{width:percentWidth(score ?? 0,1)}}/></div><p>{description}</p>
    </article>)}</div>
    <details className="an-card an-detail"><summary><Activity size={16} aria-hidden/>Más indicadores del periodo<ChevronDown size={16} aria-hidden/></summary>
      <dl>{detail.map(([label,value,description]) => <div key={label}><dt>{label}<small>{description}</small></dt><dd>{value}</dd></div>)}</dl>
    </details>
  </section>;
}

function percentWidth(value: number, total: number) {
  return ((ratio(value,total) ?? 0) * 100) + "%";
}

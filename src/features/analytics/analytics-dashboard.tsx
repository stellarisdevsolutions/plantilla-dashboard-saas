"use client";

import { useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, ChartNoAxesCombined, ChevronDown, CircleDollarSign, Crosshair, MousePointer2, UsersRound } from "lucide-react";
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
  const selected = rows.find(row => row.month === chosen) ?? rows[rows.length - 1];
  const max = Math.max(1,...rows.map(row => row[metric]));
  return <article className="an-card an-evolution">
    <header><h3>Evolución financiera</h3><select aria-label="Serie financiera" value={metric} onChange={event => setMetric(event.target.value as typeof metric)}><option value="revenue">Ingresos</option><option value="costs">Costes</option></select></header>
    <div className="an-reading" aria-live="polite"><strong>{money.format(selected[metric])}</strong><span>{dateLabel(selected.month)}</span></div>
    <div className="an-bars">{rows.map(row => <button key={row.month} aria-label={dateLabel(row.month) + ", " + money.format(row[metric])} aria-pressed={row === selected} onClick={() => setChosen(row.month)}>
      <span className="an-bar-track"><i style={{height: (row[metric] / max * 100) + "%"}} /></span><small>{shortMonth(row.month)}</small>
    </button>)}</div>
  </article>;
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
  return <section className="analytics" aria-labelledby="analysis-title">
    <div className="an-heading"><div><h2 id="analysis-title">Analítica y KPIs</h2><p>Datos de ejemplo · {dateLabel(rows[0].month)} – {dateLabel(rows[rows.length-1].month)} · USD</p></div>
      <div className="an-period" role="group" aria-label="Periodo de analítica">{[3,6,12].map(n => <button key={n} aria-pressed={period === n} onClick={() => setPeriod(n)}>{n} meses</button>)}</div>
    </div>
    <div className="an-summary">{kpis.map(({title,icon:Icon,value,raw,prior,points,values}) => <article className="an-card an-kpi" key={title}>
      <h3><Icon size={15} aria-hidden />{title}</h3><strong>{value}</strong>
      <div className="an-kpi-foot"><div><Delta value={raw} prior={prior ?? null} points={points}/><span>vs. periodo anterior</span></div><Sparkline values={values}/></div>
    </article>)}</div>
    <div className="an-trends"><Evolution rows={rows}/>
      <article className="an-card an-goal"><header><h3>Objetivo de ingresos</h3><Crosshair size={18} aria-hidden/></header>
        <div className="an-ring" style={{backgroundImage:'conic-gradient(from 220deg, var(--brand-light) '+ Math.min(100,Math.max(0,(progress ?? 0)*100)) +'%, var(--inverse-border) 0)'}}><strong>{percent(progress)}</strong></div>
        <div className="an-goal-foot"><span>Meta del periodo</span><b>{money.format(current.target)}</b></div>
      </article>
    </div>
    <div className="an-distribution">
      <article className="an-card"><header><h3>Embudo de adquisición</h3></header><div className="an-funnel">{stages.map(([title,value]) => <div key={title}><div><span>{title}</span><b>{number.format(value)}</b></div><div className="an-track"><i style={{width:percentWidth(value,current.prospects)}}/></div></div>)}</div></article>
      <article className="an-card"><header><h3>Canales de captación</h3></header><div className="an-channel-bar" aria-hidden>{current.channels.map(({label,value}) => <i key={label} style={{width:percentWidth(value,current.customers)}}/>)}</div>
        <ul className="an-channels">{current.channels.map(({label,value}) => <li key={label}><span>{label}</span><b>{number.format(value)}</b><small>{percent(ratio(value,current.customers))}</small></li>)}</ul>
      </article>
    </div>
    <div className="an-health">
      <article className="an-card"><h3>Retención mensual</h3><strong>{percent(current.retention)}</strong><p>Clientes que continúan de un mes al siguiente.</p></article>
      <article className="an-card"><h3>Satisfacción del cliente</h3><strong>{percent(current.csat)}</strong><p>Valoraciones de 4 o 5 estrellas · {number.format(current.responses)} respuestas</p></article>
      <article className="an-card"><h3>Entregas a tiempo</h3><strong>{percent(current.onTime)}</strong><p>Sobre {number.format(current.completed)} entregas completadas.</p></article>
    </div>
    <details className="an-card an-detail"><summary><Activity size={16} aria-hidden/>Más indicadores del periodo<ChevronDown size={16} aria-hidden/></summary>
      <dl>{detail.map(([label,value,description]) => <div key={label}><dt>{label}<small>{description}</small></dt><dd>{value}</dd></div>)}</dl>
    </details>
  </section>;
}

function percentWidth(value: number, total: number) {
  return ((ratio(value,total) ?? 0) * 100) + "%";
}

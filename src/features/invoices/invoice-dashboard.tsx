"use client";

import { useState, type FormEvent } from "react";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Building2, Check, CircleDollarSign, FileText, Layers3, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InvoiceMetrics } from "./invoice-metrics";
import { currency, customers, initialInvoices, reportDate, shortDate, total, type Invoice, type Status } from "./data";

const statuses: Status[] = ["Pendiente", "Borrador", "Pagada"];
const tabs = ["Todas", "Borrador", "Pendiente"] as const;
const tabLabels = { Todas: "Todas", Borrador: "Borradores", Pendiente: "Pendientes" };

export function InvoiceDashboard() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selected, setSelected] = useState(1003);
  const [tab, setTab] = useState<typeof tabs[number]>("Todas");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [modal, setModal] = useState<"create" | "item" | null>(null);
  const filtered = invoices.filter(i => (!company || i.company === company) && (!status || i.status === status)
    && (tab === "Todas" || i.status === tab) && (!from || i.due >= from) && (!to || i.due <= to)
    && ("INV-" + i.id + " " + i.company + " " + i.contact).toLowerCase().includes(query.trim().toLowerCase()));
  const current = filtered.find(i => i.id === selected) ?? filtered[0];
  const filterCount = [company, status, from, to, query.trim()].filter(Boolean).length;
  function clear() { setCompany(""); setStatus(""); setFrom(""); setTo(""); setQuery(""); setTab("Todas"); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const label = String(form.get("label")).trim();
    const amount = Number(form.get("amount"));
    if (!label || !Number.isFinite(amount) || amount <= 0) return;
    const item = { label, amount };
    if (modal === "create") {
      const customer = customers.find(c => c.company === form.get("company"));
      if (!customer) return;
      const id = Math.max(...invoices.map(i => i.id)) + 1;
      const invoice: Invoice = { ...customer, id, status: "Borrador", due: String(form.get("due")), items: [item] };
      setInvoices(rows => [invoice, ...rows]); clear(); setSelected(id);
    } else if (current) {
      setInvoices(rows => rows.map(i => i.id === current.id ? { ...i, items: [...i.items, item] } : i));
    }
    setModal(null);
  }
  function advance(invoice: Invoice) {
    const next: Status = invoice.status === "Borrador" ? "Pendiente" : "Pagada";
    setInvoices(rows => rows.map(i => i.id === invoice.id ? { ...i, status: next } : i));
    setTab("Todas"); setStatus(""); setSelected(invoice.id);
  }
  function download(invoice: Invoice) {
    const text = ["Factura INV-" + invoice.id, invoice.company, invoice.contact, shortDate(invoice.due), ...invoice.items.map(i => i.label + " · " + currency(i.amount)), "Total USD " + currency(total(invoice))].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "INV-" + invoice.id + ".txt"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="invoice-view">
      <div className="iv-title"><div><h1>Facturas</h1><p>Gestiona tus facturas y consulta el estado de cada cobro.</p></div>
        <div className="iv-title-actions"><button className="iv-icon-btn" aria-label="Mostrar u ocultar filtros" aria-expanded={showFilters} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} /></button>
          <button className="iv-primary" onClick={() => setModal("create")}><Plus size={16} />Crear factura</button></div>
      </div>
      <InvoiceMetrics invoices={invoices} />
      {showFilters && <div className="iv-filters" role="group" aria-label="Filtrar facturas">
        <div className="iv-filter-count">Filtros <b>{filterCount}</b>{filterCount > 0 && <button aria-label="Limpiar filtros" onClick={clear}><X size={14} /></button>}</div>
        <select aria-label="Filtrar por empresa" value={company} onChange={e => setCompany(e.target.value)}><option value="">Todas las empresas</option>{customers.map(c => <option key={c.company}>{c.company}</option>)}</select>
        <select aria-label="Filtrar por estado" value={status} onChange={e => { setStatus(e.target.value); setTab("Todas"); }}><option value="">Todos los estados</option>{statuses.map(s => <option key={s}>{s}</option>)}</select>
        <label className="iv-date">Desde<input type="date" aria-label="Desde" value={from} max={to || undefined} onChange={e => setFrom(e.target.value)} /></label>
        <label className="iv-date">Hasta<input type="date" aria-label="Hasta" value={to} min={from || undefined} onChange={e => setTo(e.target.value)} /></label>
        <label className="iv-search"><Search size={15} /><input type="search" aria-label="Buscar factura" placeholder="Buscar factura" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>}
      <section className="iv-ledger" aria-label="Listado y detalle de facturas">
        <div className="iv-ledger-head"><h2><FileText size={16} />Facturas <span>{filtered.length}</span></h2>
          <div className="iv-tabs" role="group" aria-label="Grupo de facturas">{tabs.map(t => <button key={t} aria-pressed={tab === t} onClick={() => {setTab(t);setStatus("");}}>{tabLabels[t]}{t !== "Todas" && <b>{invoices.filter(i => i.status === t).length}</b>}</button>)}</div>
          <Layers3 size={17} aria-hidden /></div>
        {current ? <div className="iv-ledger-body">
          <ul className="iv-list">{filtered.map(i => <li key={i.id}><button aria-pressed={current.id === i.id} onClick={() => setSelected(i.id)}>
            <span className="iv-avatar" style={{background: i.tone}}>{i.initials}</span>
            <span className="iv-list-id"><b>INV-{i.id}</b><small>{shortDate(i.due)}</small></span>
            <span className="iv-badge">{i.status}</span><strong>{currency(total(i))}</strong>
          </button></li>)}</ul>
          <article className="iv-detail" aria-label="Detalle de factura">
            <div className="iv-detail-head">
              <div><small>Detalle de factura</small><h3># INV-{current.id}</h3></div>
              <div><small>Empresa</small><b>{current.company} <Building2 size={16}/></b></div>
              <div><small>Contacto</small><b><span className="iv-avatar" style={{background: current.tone}}>{current.initials}</span>{current.contact}</b></div>
            </div>
            <div className="iv-items">{current.items.map((item,i) => <div key={i} className="iv-item"><CircleDollarSign size={14} /><b>{currency(item.amount)}</b><small>{item.label}</small></div>)}
              {current.status !== "Pagada" && <button onClick={() => setModal("item")}><Plus size={18}/>Añadir ítem</button>}
            </div>
            <div className="iv-detail-foot"><div><small>Subtotal</small><b>{currency(total(current))}</b></div><div><small>Saldo pendiente</small><b>{currency(current.status === "Pagada" ? 0 : total(current))}</b></div>
              <div className="iv-detail-actions"><button className="iv-download" aria-label="Descargar factura" onClick={() => download(current)}><ArrowDownToLine size={15}/></button>
              {current.status === "Pagada" ? <span className="iv-settled"><Check size={15}/>Pagada</span> : <button className="iv-pay" onClick={() => advance(current)}>{current.status === "Borrador" ? "Emitir factura" : "Registrar cobro"}<ArrowUpRight size={14}/></button>}</div>
            </div>
          </article>
        </div> : <div className="iv-empty">Ninguna factura coincide con los filtros.<button onClick={clear}>Ver todas <ArrowRight size={15}/></button></div>}
      </section>
      <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}>
        <DialogContent><DialogTitle>{modal === "create" ? "Crear factura" : "Añadir ítem"}</DialogTitle><DialogDescription>{modal === "create" ? "La factura se guardará como borrador en esta sesión de demostración." : "Añade un concepto al detalle de esta factura."}</DialogDescription>
          <form className="iv-form" onSubmit={submit}>
            {modal === "create" && <><label>Empresa<select name="company">{customers.map(c => <option key={c.company}>{c.company}</option>)}</select></label><label>Vencimiento<input type="date" name="due" defaultValue={reportDate} required /></label></>}
            <label>Concepto<input name="label" required pattern=".*\S.*" /></label><label>Importe en USD<input type="number" name="amount" min=".01" step=".01" required /></label>
            <button className="iv-primary" type="submit">Guardar</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

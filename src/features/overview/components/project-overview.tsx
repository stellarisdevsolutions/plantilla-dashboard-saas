"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Bell, Blocks, CalendarDays, Code2, Database, Layers, Plus, ScanLine } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CLIENT_ACCOUNTS } from "@/features/users/data";
import { DEMO_PROJECTS, PORTAL_TASKS, type DemoProject, type ProjectStatus } from "../data";
import { ActivityChartCard } from "./activity-chart-card";
import { TaskStatusCard } from "./task-status-card";
import { UpcomingTasksCard } from "./upcoming-tasks-card";
import { SessionTimer } from "./session-timer";

const projectIcons = [Code2, Blocks, Layers, Database, ScanLine];
const statuses: ProjectStatus[] = ["Completado", "En curso", "Pendiente"];
const portraits = ["👩🏽‍💻", "👨🏻‍💼", "👩🏾‍🎨", "🧑🏻‍💻"];
const assignments = ["Diseño del portal", "Panel de informes", "Flujo de registro", "Conexión de datos"];
type View = "new" | "import" | "projects" | "agenda" | null;

export function ProjectOverview() {
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [view, setView] = useState<View>(null);
  const [names, setNames] = useState("");
  const [filter, setFilter] = useState<ProjectStatus | null>(null);
  const counts = statuses.map((status) => projects.filter((project) => project.status === status).length);

  function show(next: View, status: ProjectStatus | null = null) {
    setFilter(status);
    setNames("");
    setView(next);
  }

  function addProjects(event: FormEvent) {
    event.preventDefault();
    const entries = names.trim().split(/\r?\n/).map((name) => name.trim()).filter(Boolean);
    if (!entries.length) return;
    const added: DemoProject[] = entries.map((name) => ({ id: crypto.randomUUID(), name, status: "Pendiente" }));
    setProjects((current) => [...added, ...current]);
    setView(null);
  }

  return (
    <div className="project-overview">
      <div className="overview-title">
        <div><h1>Analítica y KPIs</h1><p>Organiza tus proyectos y sigue el avance de tu equipo.</p></div>
        <div className="project-actions">
          <button className="project-pill primary-pill" onClick={() => show("new")}><Plus size={15} /> Añadir proyecto</button>
          <button className="project-pill" onClick={() => show("import")}>Importar lista</button>
        </div>
      </div>
      <section className="project-kpis" aria-label="Indicadores de proyectos">
        {["Total de proyectos", "Completados", "En curso", "Pendientes"].map((title, index) => (
          <button key={title} className="project-kpi" onClick={() => show("projects", index ? statuses[index - 1] : null)}>
            <span className="kpi-label">{title}<ArrowUpRight size={23} /></span>
            <strong>{index ? counts[index - 1] : projects.length}</strong>
            <small>{["Cartera del equipo", "Entregas finalizadas", "En desarrollo", "Por iniciar"][index]}</small>
          </button>
        ))}
      </section>
      <div className="project-board">
        <div className="board-main">
          <div className="board-top">
            <ActivityChartCard />
            <section className="project-card reminder-panel">
              <h2>Recordatorio</h2>
              <div><h3>Revisión semanal del equipo</h3><p><CalendarDays size={13} /> Viernes · 10:00–10:30</p></div>
              <button className="project-pill primary-pill" onClick={() => show("agenda")}><Bell size={14} /> Ver agenda</button>
            </section>
          </div>
          <div className="board-bottom">
            <section className="project-card team-panel">
              <div className="card-topline"><h2>Colaboración del equipo</h2><Link className="project-pill mini-pill" href="/table">Ver equipo <ArrowUpRight size={12} /></Link></div>
              <ul>{CLIENT_ACCOUNTS.slice(0, 4).map((user, index) => (
                <li key={user.id}><span className={`member-avatar tone-${index}`} aria-hidden>{portraits[index]}</span>
                  <div><strong>{user.name}</strong><small>{assignments[index]}</small></div>
                  <span className="member-role">{user.role}</span>
                </li>
              ))}</ul>
            </section>
            <TaskStatusCard {...PORTAL_TASKS} />
          </div>
        </div>
        <div className="board-side">
          <section className="project-card projects-panel">
            <div className="card-topline"><h2>Proyectos</h2><button className="project-pill mini-pill" onClick={() => show("projects")}>Ver todos</button></div>
            <ul>{projects.slice(0, 5).map((project, index) => {
              const Icon = projectIcons[index];
              return <li key={project.id}><span className={`project-glyph tone-${index}`}><Icon size={18} /></span><div><strong>{project.name}</strong><small>{project.status}</small></div></li>;
            })}</ul>
          </section>
          <SessionTimer />
        </div>
      </div>
      <Dialog open={view !== null} onOpenChange={(open) => { if (!open) setView(null); }}>
        <DialogContent className="max-h-[85dvh] overflow-auto">
          <DialogTitle>{view === "agenda" ? "Agenda del equipo" : view === "projects" ? filter ?? "Todos los proyectos" : view === "import" ? "Importar lista" : "Añadir proyecto"}</DialogTitle>
          {view === "agenda" ? <UpcomingTasksCard /> : view === "projects" ? (
            <ul className="divide-y">{projects.filter((project) => !filter || project.status === filter).map((project) => <li key={project.id} className="flex justify-between gap-2 py-2 text-sm"><span>{project.name}</span><small>{project.status}</small></li>)}</ul>
          ) : (
            <form className="grid gap-3" onSubmit={addProjects}>
              <DialogDescription>{view === "import" ? "Pega un nombre de proyecto por línea." : "El nuevo proyecto comenzará como pendiente."}</DialogDescription>
              <label htmlFor="project-names">{view === "import" ? "Nombres de proyectos" : "Nombre del proyecto"}</label>
              {view === "import" ? <Textarea id="project-names" required value={names} onChange={(event) => setNames(event.target.value)} /> :
                <input id="project-names" className="rounded-md border px-3 py-2" required value={names} onChange={(event) => setNames(event.target.value)} />}
              <Button type="submit" disabled={!names.trim()}>{view === "import" ? "Importar proyectos" : "Guardar proyecto"}</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

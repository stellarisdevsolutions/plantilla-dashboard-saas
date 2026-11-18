export function TaskStatusCard({ done, running, pending }: { done: number; running: number; pending: number }) {
  const total = done + running + pending;
  const ratio = total ? done / total : 0;
  const runningRatio = total ? running / total : 0;
  const arc = "M 23 111 A 89 89 0 0 1 201 111";
  return (
    <section className="project-card progress-panel">
      <h2>Progreso del portal</h2>
      <div className="progress-dial">
        <svg viewBox="0 0 224 132" role="img" aria-label={`${done} tareas completadas, ${running} en curso, ${pending} pendientes`}>
          <defs>
            <pattern id="progress-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(36)">
              <path d="M0 0V6" stroke="var(--chart-3)" strokeWidth="2" />
            </pattern>
          </defs>
          <g fill="none" strokeWidth="31" strokeLinecap="round">
            <path d={arc} stroke="url(#progress-stripes)" />
            {done + running > 0 && <path d={arc} pathLength="100" stroke="var(--project-ink)" strokeDasharray={`${(ratio + runningRatio) * 100} 100`} />}
            {done > 0 && <path d={arc} pathLength="100" stroke="var(--chart-1)" strokeDasharray={`${ratio * 100} 100`} />}
          </g>
        </svg>
        <div><strong>{Math.round(ratio * 100)}%</strong><small>Tareas completadas</small></div>
      </div>
      <div className="progress-key"><span>Completadas</span><span>En curso</span><span>Pendientes</span></div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Pause, Play, Square } from "lucide-react";

export function SessionTimer() {
  const [started, setStarted] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (started === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [started]);

  const seconds = Math.floor((elapsed + (started === null ? 0 : Math.max(0, now - started))) / 1000);
  const time = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60]
    .map((value) => String(value).padStart(2, "0")).join(":");

  function toggle() {
    const timestamp = Date.now();
    if (started === null) {
      setNow(timestamp);
      setStarted(timestamp);
    } else {
      setElapsed((value) => value + timestamp - started);
      setStarted(null);
    }
  }

  return (
    <section className="project-card timer-panel contour-panel">
      <h2>Tiempo de sesión</h2>
      <div className="timer-readout" role="timer">{time}</div>
      <div className="timer-controls">
        <button type="button" onClick={toggle} aria-label={started === null ? "Iniciar temporizador" : "Pausar temporizador"}>
          {started === null ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button type="button" aria-label="Reiniciar temporizador" onClick={() => { setElapsed(0); setStarted(null); }}>
          <Square size={13} fill="currentColor" />
        </button>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { DEMO_ACTIVITY } from "../data";

const bars = DEMO_ACTIVITY.chartData;
const peak = Math.max(...bars.map(({ hours }) => hours));

export function ActivityChartCard() {
  const [selected, setSelected] = useState(2);
  return (
    <section className="project-card activity-panel">
      <h2>Actividad semanal</h2>
      <div className="activity-bars" aria-label="Horas de actividad por día">
        {bars.map(({ day, hours }, index) => (
          <button key={day} type="button" aria-label={`${day}, ${hours} horas`} aria-pressed={selected === index}
            className="activity-day" onClick={() => setSelected(index)}>
            <span className="bar-track">
              <span className="activity-bar" data-texture={index === 0 || index > 3 ? "lines" : "solid"}
                style={{ height: `${hours / peak * 94}%` }}>
                {selected === index && <span className="bar-value">{hours} h</span>}
              </span>
            </span>
            <span>{day.slice(0, 1)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

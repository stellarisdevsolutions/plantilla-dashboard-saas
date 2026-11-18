export interface WorkStandItem {
  name: string;
  done: number;
  moving: number;
  waiting: number;
  total: number;
}

export const WORK_STANDS: WorkStandItem[] = [
  { name: "Tareas", done: 45, moving: 21, waiting: 14, total: 80 },
  { name: "Proyectos", done: 7, moving: 2, waiting: 2, total: 11 },
  { name: "Reseñas", done: 18, moving: 4, waiting: 3, total: 25 },
  { name: "Sesiones", done: 11, moving: 3, waiting: 2, total: 16 },
];

export const TASK_STATUS_BREAKDOWN = [
  { label: "Por iniciar", count: 16, color: "var(--chart-4)" },
  { label: "En progreso", count: 14, color: "var(--primary)" },
  { label: "En revisión", count: 5, color: "var(--chart-2)" },
  { label: "Completadas", count: 45, color: "var(--chart-3)" },
];

export const DEMO_ACTIVITY = {
  hoursLogged: 281,
  capacity: 391,
  percentageBooked: 72,
  chartData: [
    { day: "Lun", hours: 37 },
    { day: "Mar", hours: 42 },
    { day: "Mié", hours: 34 },
    { day: "Jue", hours: 48 },
    { day: "Vie", hours: 47 },
    { day: "Sáb", hours: 34 },
    { day: "Dom", hours: 39 },
  ],
};

export const DEMO_UPCOMING_TASKS = [
  { id: "review", title: "Revisar el informe semanal", due: "Hoy" },
  { id: "data", title: "Validar los datos importados", due: "Hoy" },
  { id: "planning", title: "Preparar la próxima sesión", due: "Mañana" },
  { id: "feedback", title: "Responder a las reseñas", due: "Esta semana" },
];

export type ProjectStatus = "Completado" | "En curso" | "Pendiente";
export interface DemoProject { id: string; name: string; status: ProjectStatus }

const projectGroups: [ProjectStatus, string[]][] = [
  ["En curso", ["Diseño del portal", "Flujo de registro", "Panel de informes", "Conexión de datos", "Revisión de accesibilidad", "Catálogo de recursos", "Motor de búsqueda", "Biblioteca de iconos", "Página de soporte", "Gestión de permisos", "Migración de cuentas", "Módulo de actividad"]],
  ["Pendiente", ["Automatización de alertas", "Integración de calendario"]],
  ["Completado", ["Kit de formularios", "Alta de usuarios", "Exportación de tablas", "Ajustes de perfil", "Sistema de temas", "Auditoría de contenido", "Ayuda contextual", "Bandeja de entrada", "Guía de estilos", "Navegación móvil"]],
];

export const DEMO_PROJECTS: DemoProject[] = projectGroups.flatMap(([status, names]) =>
  names.map((name) => ({ id: name, name, status })),
);

export const PORTAL_TASKS = { done: 7, running: 5, pending: 5 } as const;

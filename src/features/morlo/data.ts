export interface WorkStandItem {
  name: string;
  done: number;
  moving: number;
  waiting: number;
  total: number;
  remainingBadge: number;
}

export const WORK_STANDS: WorkStandItem[] = [
  { name: "Tareas", done: 45, moving: 21, waiting: 14, total: 80, remainingBadge: 21 },
  { name: "Proyectos", done: 7, moving: 2, waiting: 2, total: 11, remainingBadge: 3 },
  { name: "Reseñas", done: 18, moving: 4, waiting: 3, total: 25, remainingBadge: 4 },
  { name: "Sesiones", done: 11, moving: 3, waiting: 2, total: 16, remainingBadge: 2 },
];

export const STUDIO_ACCOUNT = {
  totalBalance: "£203,036.26",
  waitingToBePaid: "£110,220.00",
  inThisWeek: "£25,530.00",
  overdueInvoicesCount: 1,
};

export const TASK_STATUS_BREAKDOWN = [
  { label: "Por iniciar", count: 16, color: "#3f3f46" },
  { label: "En progreso", count: 14, color: "var(--primary)" },
  { label: "En revisión", count: 5, color: "#a1a1aa" },
  { label: "Completadas", count: 45, color: "#18181b" },
];

export const STUDIO_PULSE = {
  hoursLogged: 281,
  capacity: 391,
  percentageBooked: 72,
  chartData: [
    { day: "Lun", hours: 42 },
    { day: "Mar", hours: 48 },
    { day: "Mié", hours: 45 },
    { day: "Jue", hours: 52 },
    { day: "Vie", hours: 47.5 },
    { day: "Sáb", hours: 28 },
    { day: "Dom", hours: 18.5 },
  ],
};

export const UP_NEXT_TASKS = [
  {
    id: "task-1",
    title: "Revisar maquetas de Massgiel Distillery",
    tag: "Diseño",
    due: "Hoy 16:00",
    completed: false,
  },
  {
    id: "task-2",
    title: "Alinear sprint contable con dirección",
    tag: "Gestión",
    due: "Mañana",
    completed: false,
  },
  {
    id: "task-3",
    title: "Auditoría de rendimiento y Core Web Vitals",
    tag: "Dev",
    due: "18 Nov",
    completed: true,
  },
  {
    id: "task-4",
    title: "Configurar variables de color y tokens",
    tag: "UI Kit",
    due: "20 Nov",
    completed: false,
  },
];

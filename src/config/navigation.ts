import { Activity, BarChart3, FolderKanban, MessageSquare, LayoutGrid, LogIn, PanelsTopLeft, Settings2, type LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  pageTitle?: string;
  href: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  { title: "Analítica y KPIs", pageTitle: "Facturas", href: "/", icon: BarChart3 },
  { title: "Proyectos", href: "/projects", icon: FolderKanban },
  { title: "Analítica de reseñas", href: "/reviews", icon: MessageSquare },
  { title: "Tablas y grids", href: "/table", icon: LayoutGrid },
  { title: "Componentes UI y kit", href: "/components-showcase", icon: PanelsTopLeft },
  { title: "Estados del sistema", href: "/states", icon: Activity },
  { title: "Formularios y ajustes", href: "/settings", icon: Settings2 },
  { title: "Autenticación", href: "/login", icon: LogIn },
];

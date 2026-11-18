import { BarChart3, LayoutGrid, LogIn, PanelsTopLeft, Settings2, type LucideIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  examples?: { title: string; href: string }[];
}

export const navigation: NavigationItem[] = [
  { title: "Analítica y KPIs", href: "/", icon: BarChart3, examples: [{ title: "Proyectos", href: "/projects" }, { title: "Analítica de reseñas", href: "/reviews" }] },
  { title: "Tablas y grids", href: "/table", icon: LayoutGrid },
  { title: "Componentes UI y kit", href: "/components-showcase", icon: PanelsTopLeft, examples: [{ title: "Estados del sistema", href: "/states" }] },
  { title: "Formularios y ajustes", href: "/settings", icon: Settings2 },
  { title: "Autenticación", href: "/login", icon: LogIn },
];

export function isNavigationActive(item: NavigationItem, pathname: string) {
  return item.href === pathname || item.examples?.some(({ href }) => href === pathname);
}

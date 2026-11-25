import { Activity, BarChart3, LayoutDashboard, LayoutGrid, MessageSquare, PanelsTopLeft, Settings2, type LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: "General",
    items: [
      { title: "Resumen general", href: "/", icon: LayoutDashboard },
      { title: "Facturación y analítica", href: "/analytics", icon: BarChart3 },
      { title: "Reseñas", href: "/reviews", icon: MessageSquare },
    ],
  },
  {
    label: "Gestión",
    items: [{ title: "Tablas y usuarios", href: "/table", icon: LayoutGrid }],
  },
  {
    label: "Interfaz",
    items: [
      { title: "Componentes UI", href: "/components-showcase", icon: PanelsTopLeft },
      { title: "Estados del sistema", href: "/states", icon: Activity },
    ],
  },
  {
    label: "Cuenta",
    items: [{ title: "Ajustes", href: "/settings", icon: Settings2 }],
  },
];

/** Lista plana para el buscador y el título del header. */
export const navigation: NavigationItem[] = navigationGroups.flatMap((group) => group.items);

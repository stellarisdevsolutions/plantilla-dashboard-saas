"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  CheckSquare,
  Settings,
  MessageSquare,
  Component,
  LogIn,
  AlertCircle,
} from "lucide-react";

export interface NavLinkItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  counter?: number;
}

interface SidebarProps {
  collapsed: boolean;
}

export interface NavGroup {
  label: string;
  items: NavLinkItem[];
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups: NavGroup[] = [
    {
      label: "1. Analítica & KPIs",
      items: [
        { title: "Resumen General", href: "/", icon: LayoutGrid },
        { title: "Mesa de Reseñas", href: "/reviews", icon: MessageSquare, counter: 16 },
      ],
    },
    {
      label: "2. Tablas & Data Grids",
      items: [
        { title: "Gestor CRUD", href: "/table", icon: CheckSquare, counter: 9 },
      ],
    },
    {
      label: "3. Componentes & UI Kit",
      items: [
        { title: "Catálogo UI & Modales", href: "/components-showcase", icon: Component },
      ],
    },
    {
      label: "4. Formularios & Ajustes",
      items: [
        { title: "Ajustes de Cuenta", href: "/settings", icon: Settings },
      ],
    },
    {
      label: "5. Autenticación & Estados",
      items: [
        { title: "Iniciar Sesión", href: "/login", icon: LogIn },
        { title: "Estados & Errores", href: "/states", icon: AlertCircle },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg transition-all duration-300 ease-in-out z-30 select-none",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Cabecera de Marca (Morlo Studio) */}
      <div className="flex h-16 items-center px-5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black shadow-xs tracking-tight text-base">
            M
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-sm tracking-tight text-white leading-snug">
                Morlo Studio
              </span>
              <span className="text-[11px] text-[#a4c3b2] font-medium truncate">
                Panel de Gestión
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Contenido de Navegación */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-1.5">
            {!collapsed && (
              <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#a4c3b2]/80">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[13px] transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-white text-[#0f2a1d] font-bold shadow-md"
                      : "text-[#a4c3b2] hover:text-white hover:bg-white/10 font-medium"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                      isActive ? "text-[#0f2a1d]" : "text-[#a4c3b2] group-hover:text-white"
                    )}
                  />
                  {!collapsed && (
                    <div className="flex flex-1 items-center justify-between truncate">
                      <span className="truncate">{item.title}</span>
                      {item.counter !== undefined && (
                        <span
                          className={cn(
                            "ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md font-bold",
                            isActive
                              ? "bg-emerald-100 text-[#0f2a1d]"
                              : "bg-white/10 text-[#a4c3b2]"
                          )}
                        >
                          {item.counter}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}

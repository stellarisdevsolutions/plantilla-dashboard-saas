"use client";

import { CirclePower, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardConfig } from "@/config/dashboard";
import { isNavigationActive, navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ collapsed = false, onNavigate }: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "flex h-full shrink-0 flex-col rounded-2xl bg-sidebar text-sidebar-foreground",
      collapsed ? "w-[72px]" : "rail-width",
    )}>
      <div className="flex h-20 shrink-0 items-center px-5">
        <Link href="/" onClick={onNavigate} aria-label={dashboardConfig.name} className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border-[2.5px] border-primary text-primary">
            <CirclePower size={21} strokeWidth={2.6} aria-hidden />
          </span>
          {!collapsed && <span className="truncate text-sm font-semibold">{dashboardConfig.name}</span>}
        </Link>
      </div>
      <nav aria-label="Navegación principal" className="space-y-1 overflow-y-auto px-2 py-4">
        {!collapsed && <p className="nav-label">Módulos</p>}
        {navigation.map((item) => {
          const { title, href, icon: Icon } = item;
          const active = isNavigationActive(item, pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? (pathname === href ? "page" : "location") : undefined}
              aria-label={title}
              title={collapsed ? title : undefined}
              className={cn(
                "module-link flex min-h-10 items-center gap-3 rounded-full text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-sidebar-ring",
                collapsed ? "justify-center" : "px-3",
                active
                  ? "active-module font-semibold text-foreground"
                  : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-[17px] shrink-0" aria-hidden />
              {!collapsed && <span>{title}</span>}
            </Link>
          );
        })}
      </nav>
      {!collapsed && <Link href="/components-showcase" onClick={onNavigate} className="rail-feature contour-panel">
        <Layers3 size={20} aria-hidden /><strong>Kit de interfaz</strong><span>Ver componentes</span>
      </Link>}
    </aside>
  );
}

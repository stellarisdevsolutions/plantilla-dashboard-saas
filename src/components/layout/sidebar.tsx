"use client";

import { ArrowUpRight, Component, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardConfig } from "@/config/dashboard";
import { navigation } from "@/config/navigation";

export function Sidebar({ collapsed = false, onNavigate }: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <aside className="shell-rail" data-collapsed={collapsed}>
      <Link href="/" onClick={onNavigate} aria-label={dashboardConfig.name} className="shell-brand">
        <span className="shell-mark"><Layers3 size={23} strokeWidth={2.2} aria-hidden /></span>
        <strong>{dashboardConfig.name}</strong>
      </Link>
      <nav aria-label="Navegación principal" className="shell-modules">
        <p aria-hidden={collapsed}>Módulos</p>
        {navigation.map(item => {
          const { title, href, icon: Icon } = item;
          return <Link key={href} href={href} onClick={onNavigate} aria-label={title} title={collapsed ? title : undefined}
            aria-current={pathname === href ? "page" : undefined}>
            <Icon size={17} aria-hidden /><span>{title}</span>
          </Link>;
        })}
      </nav>
      <Link href="/components-showcase" onClick={onNavigate} className="shell-kit" aria-label="Abrir kit de interfaz" title={collapsed ? "Kit de interfaz" : undefined}>
        <Component size={20} aria-hidden /><span>Kit de interfaz</span><ArrowUpRight size={15} aria-hidden />
      </Link>
    </aside>
  );
}

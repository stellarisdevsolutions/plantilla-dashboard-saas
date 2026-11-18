"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, PanelLeft } from "lucide-react";
import { PaletteSwitcher } from "@/components/palette-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { demoUser } from "@/config/dashboard";
import { isNavigationActive, navigation } from "@/config/navigation";
import { ModuleSearch } from "./module-search";

export function Header({ onToggleSidebar, collapsed, mobileNavigation }: {
  onToggleSidebar: () => void;
  collapsed: boolean;
  mobileNavigation: React.ReactNode;
}) {
  const pathname = usePathname();
  const section = navigation.find(item => isNavigationActive(item, pathname));
  const pages = section ? [{ title: section.pageTitle ?? section.title, href: section.href }, ...(section.examples ?? [])] : [];
  return (
    <header className="dashboard-header">
      <div className="shell-header-start">
        {mobileNavigation}
        <Button variant="ghost" size="icon" className="hidden shrink-0 md:inline-flex" onClick={onToggleSidebar}
          aria-label={collapsed ? "Expandir navegación" : "Contraer navegación"} aria-expanded={!collapsed}>
          <PanelLeft aria-hidden />
        </Button>
        {pages.length > 1 ? <nav className="shell-pages" aria-label="Páginas del módulo">
          {pages.map(page => <Link key={page.href} href={page.href} aria-current={pathname === page.href ? "page" : undefined}>{page.title}</Link>)}
        </nav> : <span className="shell-section">{section?.title}</span>}
      </div>
      <div className="shell-header-tools">
        <ModuleSearch />
        <PaletteSwitcher />
        <ThemeToggle />
        <Link href="/settings" className="shell-profile" aria-label="Configuración de la cuenta">
          <span className="shell-initials">{demoUser.initials}</span>
          <span className="shell-profile-name">{demoUser.name}<ChevronDown size={13} aria-hidden /></span>
        </Link>
      </div>
    </header>
  );
}

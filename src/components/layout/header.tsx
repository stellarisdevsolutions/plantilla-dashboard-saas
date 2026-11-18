"use client";

import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { PaletteSwitcher } from "@/components/palette-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { demoUser } from "@/config/dashboard";
import { ModuleSearch } from "./module-search";

export function Header({ onToggleSidebar, collapsed, mobileNavigation }: {
  onToggleSidebar: () => void;
  collapsed: boolean;
  mobileNavigation: React.ReactNode;
}) {
  return (
    <header className="dashboard-header flex items-center justify-between gap-3 px-3 md:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {mobileNavigation}
        <Button
          variant="ghost"
          size="icon"
          className="hidden shrink-0 md:inline-flex"
          onClick={onToggleSidebar}
          aria-label={collapsed ? "Expandir navegación" : "Contraer navegación"}
          aria-expanded={!collapsed}
        >
          <PanelLeft aria-hidden />
        </Button>
        <ModuleSearch />
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <PaletteSwitcher />
        <ThemeToggle />
        <Link href="/settings" className="flex items-center gap-2 rounded-full px-1 py-0.5 hover:bg-muted lg:pe-2.5" aria-label="Configuración de la cuenta">
          <Avatar className="size-8">
            <AvatarFallback className="profile-portrait"><span aria-hidden>🧑🏽‍💼</span></AvatarFallback>
          </Avatar>
          <span className="hidden text-xs font-semibold lg:grid">{demoUser.name}<small className="font-normal text-muted-foreground">{demoUser.email}</small></span>
        </Link>
      </div>
    </header>
  );
}

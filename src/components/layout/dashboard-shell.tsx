"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileNavigation = (
    <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon" className="shrink-0 md:hidden" aria-label="Abrir navegación" />}>
        <Menu aria-hidden />
      </DialogTrigger>
      <DialogContent className="inset-y-0 left-0 h-dvh w-64 max-w-[85vw] translate-x-0 translate-y-0 overflow-hidden rounded-none p-0 shell-drawer md:hidden [&_aside]:w-full">
        <DialogTitle className="sr-only">Navegación principal</DialogTitle>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="dashboard-frame">
      <div className="desktop-rail">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="dashboard-workspace">
        <Header collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} mobileNavigation={mobileNavigation} />
        <main key={pathname} className="dashboard-main space-y-5">
          {children}
        </main>
      </div>
    </div>
  );
}

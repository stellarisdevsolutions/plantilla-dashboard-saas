"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Eye, Menu } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useDemoRoleStore } from "@/lib/demo-role-store";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, setRole } = useDemoRoleStore();

  const mobileNavigation = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            aria-label="Abrir navegación"
          />
        }
      >
        <Menu aria-hidden />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 max-w-[85vw] border-none p-0 shell-drawer md:hidden [&_aside]:w-full"
      >
        <SheetTitle className="sr-only">Navegación principal</SheetTitle>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="dashboard-frame">
      <div className="desktop-rail">
        <Sidebar collapsed={collapsed} />
      </div>
      <div className="dashboard-workspace">
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
          mobileNavigation={mobileNavigation}
        />
        <main key={pathname} className="dashboard-main space-y-5">
          {role === "Lectura" && (
            <Alert variant="warning" className="items-center">
              <Eye aria-hidden />
              <AlertTitle className="flex flex-wrap items-center justify-between gap-2">
                <span>Modo solo lectura activo (RBAC demo)</span>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={() => setRole("Administrador")}
                  className="cursor-pointer"
                >
                  Volver a Administrador
                </Button>
              </AlertTitle>
              <AlertDescription>
                Las acciones de creación, edición y eliminación están bloqueadas visualmente.
              </AlertDescription>
            </Alert>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar fijo/responsivo */}
      <Sidebar collapsed={collapsed} />

      {/* Área Principal de Contenido */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header onToggleSidebar={() => setCollapsed((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

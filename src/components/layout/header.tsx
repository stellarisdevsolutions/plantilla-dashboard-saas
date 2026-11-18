"use client";

import * as React from "react";
import { PaletteSwitcher } from "@/components/palette-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clock, Menu } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  // Estado para la fecha y hora sin problemas de hidratación SSR
  const [dateTimeStr, setDateTimeStr] = React.useState("Viernes • 10:00 AM");

  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const diaNombre = dias[now.getDay()];
      let horas = now.getHours();
      const minutos = now.getMinutes().toString().padStart(2, "0");
      const ampm = horas >= 12 ? "PM" : "AM";
      horas = horas % 12;
      horas = horas ? horas : 12; // Formato 12 horas
      const horaStr = `${horas}:${minutos} ${ampm}`;

      setDateTimeStr(`${diaNombre} • ${horaStr}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/60 bg-white dark:bg-card px-4 sm:px-8 shadow-xs">
      {/* Lado Izquierdo: Botón Hamburguesa + Buscador */}
      <div className="flex items-center gap-3 w-full max-w-xs sm:max-w-sm">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8.5 w-8.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer rounded-lg shrink-0"
            title="Alternar barra lateral"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar tareas, proyectos, personas..."
            className="h-9 pl-8 pr-10 text-xs bg-slate-50 dark:bg-muted/40 border-border/60 rounded-xl focus-visible:bg-white focus-visible:ring-1 transition-colors"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-4 select-none items-center gap-0.5 rounded border border-border/60 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground sm:flex">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Lado Derecho: Fecha/Hora (estilo limpio no cápsula), Paleta, Tema y Usuario logueado */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Fecha y Hora: Estilo tipográfico minimalista con icono sutil (no cápsula) */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-medium select-none">
          <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="tracking-tight font-sans text-foreground/80">
            {dateTimeStr}
          </span>
        </div>

        {/* Divisor sutil */}
        <div className="hidden md:block h-4 w-px bg-border/60" />

        {/* Selector de paleta de colores */}
        <PaletteSwitcher />

        {/* Conmutador de modo oscuro / claro */}
        <ThemeToggle />

        {/* Divisor sutil */}
        <div className="h-5 w-px bg-border/60" />

        {/* Usuario logueado */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative">
            <Avatar className="h-8 w-8 ring-1 ring-border/60 transition-transform group-hover:scale-105">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Dara Whitfield"
              />
              <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                DW
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>

          <div className="hidden sm:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
              Dara Whitfield
            </span>
            <span className="text-[10px] text-muted-foreground">
              Administrador
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

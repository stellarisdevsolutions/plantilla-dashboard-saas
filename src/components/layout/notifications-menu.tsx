"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  Bell,
  CheckCheck,
  FileCheck2,
  MessageSquare,
  Settings2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  href: string;
  read: boolean;
  kind: "invoice" | "review" | "user" | "system" | "settings";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Factura #INV-1003 cobrada",
    description: "Se registró el pago completo de la operación.",
    time: "Hace 8 min",
    href: "/analytics",
    read: false,
    kind: "invoice",
  },
  {
    id: "n-2",
    title: "Nueva reseña de 5★",
    description: "Un cliente dejó una valoración positiva pendiente de respuesta.",
    time: "Hace 34 min",
    href: "/reviews",
    read: false,
    kind: "review",
  },
  {
    id: "n-3",
    title: "Cuenta pendiente de aprobación",
    description: "Camila Rojas solicita verificación de acceso al directorio.",
    time: "Hace 2 horas",
    href: "/table",
    read: false,
    kind: "user",
  },
  {
    id: "n-4",
    title: "Simulación de estados lista",
    description: "Catálogo de errores y empty states actualizado.",
    time: "Ayer",
    href: "/states",
    read: true,
    kind: "system",
  },
  {
    id: "n-5",
    title: "Preferencias de seguridad",
    description: "Recordatorio para revisar las claves API de demostración.",
    time: "Hace 2 días",
    href: "/settings",
    read: true,
    kind: "settings",
  },
];

const iconMap = {
  invoice: FileCheck2,
  review: MessageSquare,
  user: UserPlus,
  system: Activity,
  settings: Settings2,
};

export function NotificationsMenu() {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<"all" | "unread">("all");
  const [items, setItems] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = items.filter((item) => !item.read).length;
  const visible = filter === "unread" ? items.filter((item) => !item.read) : items;

  function markAllAsRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
    toast.success("Todas las notificaciones marcadas como leídas");
  }

  function clearRead() {
    setItems((current) => current.filter((item) => !item.read));
    toast.info("Notificaciones leídas eliminadas de la bandeja");
  }

  function markOneRead(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={
          unreadCount > 0
            ? `Notificaciones (${unreadCount} sin leer)`
            : "Notificaciones"
        }
        title="Notificaciones"
        className="relative grid size-9 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted cursor-pointer"
      >
        <Bell className="size-4 text-muted-foreground" aria-hidden />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 grid min-w-4 h-4 px-1 place-items-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground shadow-xs">
            {unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 sm:w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">Notificaciones</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                {unreadCount} nuevas
              </Badge>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={unreadCount === 0}
            onClick={markAllAsRead}
            className="gap-1 text-[11px] text-primary hover:text-primary cursor-pointer"
          >
            <CheckCheck className="size-3.5" aria-hidden />
            Marcar todo
          </Button>
        </div>

        <div className="flex items-center gap-1 border-b border-border/70 bg-muted/30 px-3 py-1.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
              filter === "all"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Todas ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
              filter === "unread"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            No leídas ({unreadCount})
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-border/60">
          {visible.length > 0 ? (
            visible.map((item) => {
              const Icon = iconMap[item.kind];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => markOneRead(item.id)}
                  className={cn(
                    "flex items-start gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60",
                    !item.read && "bg-accent/40"
                  )}
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span
                          aria-label="Sin leer"
                          className="size-2 shrink-0 rounded-full bg-primary"
                        />
                      )}
                    </div>
                    <p className="line-clamp-2 text-[11px] text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="block text-[10px] text-muted-foreground/80">
                      {item.time}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center space-y-1">
              <p className="text-xs font-medium text-foreground">
                No hay notificaciones pendientes
              </p>
              <p className="text-[11px] text-muted-foreground">
                Estás al día con toda la actividad del panel.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={items.every((item) => !item.read)}
            onClick={clearRead}
            className="gap-1 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Trash2 className="size-3" aria-hidden />
            Limpiar leídas
          </Button>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="text-[11px] font-medium text-primary hover:underline"
          >
            Configurar alertas
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

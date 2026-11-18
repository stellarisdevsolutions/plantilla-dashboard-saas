"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Inbox,
  AlertTriangle,
  FileQuestion,
  Lock,
  RefreshCw,
  Plus,
  ArrowLeft,
  ServerCrash,
  WifiOff,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function StatesPage() {
  const [activeTab, setActiveTab] = React.useState<"empty" | "404" | "error" | "forbidden" | "offline">("empty");
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleSimulateRetry = () => {
    setIsRetrying(true);
    toast.loading("Reintentando conexión con el servicio...", { id: "retry-toast" });
    setTimeout(() => {
      setIsRetrying(false);
      toast.success("Conexión restablecida con éxito.", { id: "retry-toast" });
    }, 1200);
  };

  return (
    <DashboardShell>
      {/* Cabecera del Módulo */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide border border-primary/20">
          Módulo 5 · Autenticación & Estados
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Estados del Sistema & Páginas de Error
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Plantillas visuales reutilizables para estados vacíos (empty states), errores 404, caídas de servidor 500 y permisos denegados.
        </p>
      </div>

      {/* Selector de Pestañas de Estados */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          { id: "empty", label: "Estado Vacío (Empty State)", icon: Inbox },
          { id: "404", label: "Página 404 (No Encontrado)", icon: FileQuestion },
          { id: "error", label: "Error de Servidor (500)", icon: ServerCrash },
          { id: "forbidden", label: "Permisos Denegados (403)", icon: Lock },
          { id: "offline", label: "Sin Conexión / Mantenimiento", icon: WifiOff },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenedor Visual del Estado Seleccionado */}
      <div className="grid grid-cols-1 gap-6">
        {/* 1. ESTADO VACÍO (EMPTY STATE) */}
        {activeTab === "empty" && (
          <Card className="border-border/80 bg-card/95 shadow-sm rounded-xl overflow-hidden p-8 sm:p-16 text-center">
            <div className="mx-auto max-w-md space-y-5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shadow-inner">
                <Inbox className="h-10 w-10 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  No se encontraron elementos
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No hay registros activos en esta vista con los filtros seleccionados. Puedes crear un nuevo registro o restablecer los parámetros de búsqueda.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={() => toast.info("Crear nuevo registro", { description: "Abriendo formulario modal de creación." })}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Elemento
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast.success("Filtros restablecidos", { description: "Mostrando todos los datos." })}
                  className="w-full sm:w-auto text-xs font-semibold cursor-pointer"
                >
                  Restablecer Filtros
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* 2. PÁGINA 404 (NOT FOUND) */}
        {activeTab === "404" && (
          <Card className="border-border/80 bg-card/95 shadow-sm rounded-xl overflow-hidden p-8 sm:p-16 text-center">
            <div className="mx-auto max-w-md space-y-5">
              <span className="font-mono text-6xl sm:text-7xl font-black text-primary/80 tracking-tighter">
                404
              </span>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Página no encontrada
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  La ruta o recurso que estás intentando consultar no existe, fue movida a otra ubicación o no tienes acceso.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/" className="w-full sm:w-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 cursor-pointer shadow-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Inicio
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Centro de Ayuda", { description: "Consultando documentación." })}
                  className="w-full sm:w-auto text-xs font-semibold cursor-pointer"
                >
                  Documentación UI
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* 3. ERROR 500 (SERVER ERROR) */}
        {activeTab === "error" && (
          <Card className="border-destructive/30 bg-card/95 shadow-sm rounded-xl overflow-hidden p-8 sm:p-16 text-center">
            <div className="mx-auto max-w-md space-y-5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-inner">
                <ServerCrash className="h-10 w-10 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Error interno del servidor
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ocurrió una excepción inesperada al procesar la solicitud en el endpoint. Los ingenieros de Morlo Studio han sido notificados.
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-left font-mono text-[11px] text-muted-foreground border border-border">
                <span className="text-destructive font-bold">ERROR_CODE:</span> 500_INTERNAL_SERVER_ERROR<br />
                <span className="text-muted-foreground">TRACE_ID:</span> req_8f9210ab_20261117
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={handleSimulateRetry}
                  disabled={isRetrying}
                  className="w-full sm:w-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-xs gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
                  {isRetrying ? "Reintentando..." : "Reintentar Solicitud"}
                </Button>
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-semibold cursor-pointer">
                    Ir al Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* 4. PERMISOS DENEGADOS (403 FORBIDDEN) */}
        {activeTab === "forbidden" && (
          <Card className="border-amber-500/30 bg-card/95 shadow-sm rounded-xl overflow-hidden p-8 sm:p-16 text-center">
            <div className="mx-auto max-w-md space-y-5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
                <ShieldAlert className="h-10 w-10 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Acceso restringido (403)
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Tu cuenta actual no posee privilegios de <strong className="text-foreground">Administrador de Organización</strong> para modificar o visualizar este módulo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={() => toast.info("Solicitud enviada", { description: "Se notificó al administrador de tu equipo." })}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs cursor-pointer shadow-sm"
                >
                  Solicitar Permisos
                </Button>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full text-xs font-semibold cursor-pointer">
                    Cambiar de Cuenta
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* 5. SIN CONEXIÓN / MANTENIMIENTO */}
        {activeTab === "offline" && (
          <Card className="border-border/80 bg-card/95 shadow-sm rounded-xl overflow-hidden p-8 sm:p-16 text-center">
            <div className="mx-auto max-w-md space-y-5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground border border-border shadow-inner">
                <WifiOff className="h-10 w-10 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Sin conexión con el servidor
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Parece que tu red perdió conectividad o la instancia del panel está en una ventana de mantenimiento preventivo programado.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={handleSimulateRetry}
                  disabled={isRetrying}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs gap-1.5 cursor-pointer shadow-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
                  Comprobar Conexión
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tarjeta de Especificación Técnica del Módulo */}
      <Card className="border-border/60 bg-muted/30 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-foreground">
              Guía de Implementación en Producción
            </span>
            <p className="text-xs text-muted-foreground">
              Cada uno de estos estados cuenta con soporte de TypeScript, diseño responsivo, temas claro/oscuro y componentes de Base UI listos para copiar y usar en tu aplicación.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/login">
              <Button size="sm" variant="outline" className="text-xs font-semibold cursor-pointer">
                Ver Pantalla de Login →
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
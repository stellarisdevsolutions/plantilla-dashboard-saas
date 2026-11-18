"use client";

import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Search,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  Copy,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComponentsShowcasePage() {
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [switch1, setSwitch1] = React.useState(true);
  const [switch2, setSwitch2] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const simulateLoading = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      toast.success("Operación asíncrona completada");
    }, 1500);
  };

  const simulatePromiseToast = () => {
    const promise = () =>
      new Promise((resolve) => setTimeout(() => resolve({ name: "Dashboard" }), 2000));

    toast.promise(promise, {
      loading: "Procesando solicitud en servidor...",
      success: () => "¡Datos sincronizados exitosamente!",
      error: "Ocurrió un error al procesar",
    });
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado al portapapeles");
  };

  return (
    <DashboardShell>
      <div className="flex flex-col gap-1 pb-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Catálogo de Componentes & UI Kit
        </h1>
        <p className="text-xs text-muted-foreground">
          Bloques listos para copiar y pegar en tus vistas y conectar con el backend
        </p>
      </div>

      {/* 1. INPUTS Y FORMULARIOS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">1. Inputs & Controles de Formulario</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Variantes con iconos, prefijos, estados deshabilitados y áreas de texto
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Input Normal */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Input Estándar</Label>
            <Input placeholder="Escribe aquí..." className="text-xs h-8" />
            <span className="text-[10px] text-muted-foreground">Texto de ayuda secundario</span>
          </div>

          {/* Input con Icono */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Input con Icono de Búsqueda</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Buscar por palabra clave..." className="h-8 pl-8 text-xs" />
            </div>
          </div>

          {/* Input con Email */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="email" placeholder="usuario@dominio.com" className="h-8 pl-8 text-xs" />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Contraseña Secreta</Label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input type="password" value="secreto123" readOnly className="h-8 pl-8 text-xs font-mono" />
            </div>
          </div>

          {/* Input Deshabilitado */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Campo de Solo Lectura</Label>
            <Input value="ID-99214 (No editable)" disabled className="text-xs h-8 bg-muted/60" />
          </div>

          {/* Switch Toggles */}
          <div className="space-y-3">
            <Label className="text-xs font-medium block">Switches de Activación</Label>
            <div className="flex items-center justify-between rounded-lg border border-border/70 p-2.5 bg-muted/20">
              <span className="text-xs font-medium text-foreground">Alertas en tiempo real</span>
              <Switch checked={switch1} onCheckedChange={setSwitch1} />
            </div>
          </div>

          {/* Textarea */}
          <div className="md:col-span-2 lg:col-span-3 space-y-1.5">
            <Label className="text-xs font-medium">Área de Texto Multilínea (Textarea)</Label>
            <Textarea
              placeholder="Notas internas, observaciones o descripciones largas..."
              className="text-xs min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. BOTONES Y ESTADOS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">2. Botones & Acciones</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Todos los estilos integrados con la paleta de colores activa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
              Botón Primario
            </Button>
            <Button variant="secondary" size="sm" className="text-xs">
              Secundario
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Outline
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Ghost
            </Button>
            <Button variant="destructive" size="sm" className="text-xs">
              Destructivo
            </Button>
            <Button
              size="sm"
              disabled={loadingButton}
              onClick={simulateLoading}
              className="text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loadingButton ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Cargando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Acción Asíncrona</span>
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <span>Siguiente</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. BADGES Y ESTADOS DE SEMÁFORO */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">3. Badges & Estados de Sistema</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Etiquetas visuales para tablas, tarjetas de crédito y feeds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Éxito / Aprobado</span>
            </Badge>
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Pendiente / Alerta</span>
            </Badge>
            <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs gap-1">
              <XCircle className="h-3 w-3" />
              <span>Rechazado / Error</span>
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs gap-1">
              <Info className="h-3 w-3" />
              <span>Informativo</span>
            </Badge>
            <Badge variant="outline" className="text-xs">
              Neutro / Outline
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Secundario
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 4. TOASTS Y NOTIFICACIONES SONNER */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">4. Notificaciones Flotantes (Sonner)</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Feedback instantáneo al usuario para mutaciones y operaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Operación exitosa", { description: "Los cambios se guardaron correctamente." })}
              className="text-xs text-primary cursor-pointer"
            >
              Toast Éxito
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.error("Error en la solicitud", { description: "No se pudo conectar con el servidor." })}
              className="text-xs text-destructive cursor-pointer"
            >
              Toast Error
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Nota del sistema", { description: "Hay una actualización programada hoy." })}
              className="text-xs text-blue-500 cursor-pointer"
            >
              Toast Info
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={simulatePromiseToast}
              className="text-xs cursor-pointer"
            >
              Toast con Promesa Asíncrona (Loading)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 5. MODALES Y DIÁLOGOS INTERACTIVOS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">5. Modales & Diálogos (Dialog)</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Ventanas modales para edición, creación y confirmación de datos con validación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            {/* Modal de Formulario */}
            <Button
              size="sm"
              onClick={() => setFormDialogOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs cursor-pointer"
            >
              Abrir Modal de Formulario
            </Button>
            <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold">Crear Nuevo Registro</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Introduce los datos para el nuevo elemento del dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Nombre del Proyecto</Label>
                    <Input placeholder="Ej. Campaña Q4 2026" className="text-xs h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Responsable</Label>
                    <Input placeholder="Ej. Maria Lopez" className="text-xs h-8" />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setFormDialogOpen(false)} className="text-xs cursor-pointer">
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setFormDialogOpen(false);
                      toast.success("Registro creado", { description: "Se ha añadido al sistema correctamente." });
                    }}
                    className="bg-primary text-primary-foreground text-xs cursor-pointer"
                  >
                    Guardar Registro
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Modal de Confirmación Destructiva */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmDialogOpen(true)}
              className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs cursor-pointer"
            >
              Modal de Confirmación Destructiva
            </Button>
            <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold text-destructive">¿Estás seguro de continuar?</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Esta acción es irreversible y eliminará los datos seleccionados del servidor.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2 pt-3">
                  <Button variant="outline" size="sm" onClick={() => setConfirmDialogOpen(false)} className="text-xs cursor-pointer">
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setConfirmDialogOpen(false);
                      toast.error("Elemento eliminado", { description: "El registro ha sido purgado de la base de datos." });
                    }}
                    className="text-xs cursor-pointer"
                  >
                    Sí, Eliminar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* 6. ESTADOS DE CARGA (SKELETONS) */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">6. Estados de Carga (Skeletons)</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Marcadores de posición animados mientras el backend o la API responden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border/60 p-4 space-y-3 bg-card">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-2.5 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="rounded-lg border border-border/60 p-4 space-y-3 bg-card">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. CÓDIGO RÁPIDO PARA REUTILIZAR */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <CardTitle className="text-base font-semibold">Cómo clonar este componente en tu nuevo proyecto</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyCode("import { Button } from '@/components/ui/button';\nimport { Input } from '@/components/ui/input';")}
              className="h-7 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              <span>Copiar import</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/60 p-3.5 font-mono text-xs text-foreground/90 overflow-x-auto border border-border/60">
            <code>
              {`// Ejemplo de importación directa en cualquier página o componente:
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";`}
            </code>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}

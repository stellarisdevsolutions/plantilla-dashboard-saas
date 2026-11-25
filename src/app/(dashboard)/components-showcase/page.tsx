"use client";

import * as React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  CalendarDays,
  PanelRightOpen,
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

const datePresets = [
  "Hoy",
  "Últimos 7 días",
  "Últimos 30 días",
  "Trimestre actual",
];

export default function ComponentsShowcasePage() {
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [switch1, setSwitch1] = React.useState(true);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState("Últimos 30 días");
  const [popoverOpen, setPopoverOpen] = React.useState(false);

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

  const copyCode = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { toast.error("No se pudo copiar el código"); return; }
    toast.success("Código copiado al portapapeles");
  };

  return (
      <div className="module-page kit-page">
      <PageHeading title="Componentes UI y kit" description="Botones, controles, diálogos, drawers, alertas y notificaciones listos para reutilizar." actions={<Link href="/states" className={buttonVariants({ variant: "outline" })}>Ver estados del sistema</Link>} />

      {/* 1. INPUTS Y FORMULARIOS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Campos y controles</CardTitle>
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
          <CardTitle className="text-base font-semibold">Botones y acciones</CardTitle>
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
          <CardTitle className="text-base font-semibold">Etiquetas de estado</CardTitle>
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
            <Badge className="bg-warning/10 text-warning border-warning/20 text-xs gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Pendiente / Alerta</span>
            </Badge>
            <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs gap-1">
              <XCircle className="h-3 w-3" />
              <span>Rechazado / Error</span>
            </Badge>
            <Badge className="bg-info/10 text-info border-info/20 text-xs gap-1">
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

      {/* 4. ALERTAS Y CALLOUTS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Alertas y callouts</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Mensajes persistentes dentro de formularios y cabeceras de módulos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Alert variant="info">
            <Info />
            <AlertTitle>Actualización disponible</AlertTitle>
            <AlertDescription>Sincroniza los tokens del sistema antes de exportar la vista.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>Configuración verificada</AlertTitle>
            <AlertDescription>Todas las validaciones visuales pasaron correctamente.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle />
            <AlertTitle>Modo solo lectura</AlertTitle>
            <AlertDescription>Los usuarios con rol Lectura no pueden modificar registros.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle />
            <AlertTitle>Acción destructiva</AlertTitle>
            <AlertDescription>Eliminar cuentas del directorio es irreversible en producción.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* 5. DRAWER LATERAL, POPOVER DE FECHAS Y BREADCRUMB */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Drawer, Popover y Breadcrumb</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Paneles deslizantes, selectores flotantes de rango y migas de pan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">Migas de pan (Breadcrumb)</Label>
            <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/table">Gestión</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Detalle de cuenta</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sheet / Drawer lateral */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs cursor-pointer" />
                }
              >
                <PanelRightOpen className="size-3.5" aria-hidden />
                Abrir Drawer lateral
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Resumen del registro</SheetTitle>
                  <SheetDescription>
                    Ejemplo de panel lateral deslizable (Sheet) para vistas Master-Detail.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 space-y-3 p-5 text-xs">
                  <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
                    <span className="text-muted-foreground block">Estado actual</span>
                    <strong className="mt-1 block text-sm">Activo · Plan Pro</strong>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ideal para inspeccionar detalles de usuarios, facturas o configuraciones sin perder el contexto de la tabla.
                  </p>
                </div>
                <SheetFooter>
                  <Button size="sm" variant="outline" onClick={() => setSheetOpen(false)}>
                    Cerrar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSheetOpen(false);
                      toast.success("Cambios aplicados desde el Drawer");
                    }}
                  >
                    Aplicar acción
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Popover Selector de Fechas */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                render={
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs cursor-pointer" />
                }
              >
                <CalendarDays className="size-3.5" aria-hidden />
                <span>Periodo: {dateRange}</span>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-60 space-y-2 p-2.5">
                <p className="px-1 text-[11px] font-semibold text-muted-foreground">
                  Rango rápido de demostración
                </p>
                <div className="grid gap-1">
                  {datePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setDateRange(preset);
                        setPopoverOpen(false);
                        toast.info(`Filtro aplicado: ${preset}`);
                      }}
                      className={`rounded-md px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                        dateRange === preset
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* 6. TOASTS Y NOTIFICACIONES SONNER */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Notificaciones</CardTitle>
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
              className="text-xs text-info cursor-pointer"
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

      {/* 7. MODALES Y DIÁLOGOS INTERACTIVOS */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Diálogos</CardTitle>
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
                <form onSubmit={event => {event.preventDefault(); setFormDialogOpen(false); toast.success("Registro de ejemplo validado");}}>
                <div className="space-y-3 py-3">
                  <div className="space-y-1">
                    <Label htmlFor="kit-project" className="text-xs font-medium">Nombre del Proyecto</Label>
                    <Input id="kit-project" required placeholder="Ej. Campaña Q4 2026" className="text-xs h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="kit-owner" className="text-xs font-medium">Responsable</Label>
                    <Input id="kit-owner" required placeholder="Ej. Maria Lopez" className="text-xs h-8" />
                  </div>
                </div>
                <DialogFooter className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setFormDialogOpen(false)} className="text-xs cursor-pointer">
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    className="bg-primary text-primary-foreground text-xs cursor-pointer"
                  >
                    Guardar Registro
                  </Button>
                </DialogFooter></form>
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

      {/* 8. ESTADOS DE CARGA (SKELETONS) */}
      <Card className="border-border/80 bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Estados de carga</CardTitle>
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

      {/* 9. CÓDIGO RÁPIDO PARA REUTILIZAR */}
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
              onClick={() =>
                copyCode(
                  'import { Button } from "@/components/ui/button";\nimport { Alert } from "@/components/ui/alert";\nimport { Sheet, SheetContent } from "@/components/ui/sheet";\nimport { Popover, PopoverContent } from "@/components/ui/popover";\nimport { Breadcrumb } from "@/components/ui/breadcrumb";'
                )
              }
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { toast } from "sonner";`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

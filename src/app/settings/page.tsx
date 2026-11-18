"use client";

import * as React from "react";
import { PageHeading } from "@/components/layout/page-heading";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { demoUser } from "@/config/dashboard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Bell,
  Key,
  ShieldAlert,
  Copy,
  Save,
  Check,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [copied, setCopied] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Estados de formulario
  const [profile, setProfile] = React.useState(demoUser);

  // Estados de notificaciones
  const [notifications, setNotifications] = React.useState({
    emailAlerts: true,
    weeklyReport: true,
    securityLogin: true,
    smsAlerts: false,
  });

  // Clave API de demostración
  const apiKey = "demo_api_key_example";

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("Clave de API copiada", {
      description: "El token se ha copiado al portapapeles de forma segura.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Perfil actualizado", {
        description: "Cambios aplicados para esta demostración.",
      });
    }, 900);
  };

  return (
    <DashboardShell>
      <PageHeading title="Formularios y ajustes" description="Ejemplos de edición de perfil, preferencias y credenciales." />

      {/* Pestañas de Ajustes */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/60 p-1 rounded-xl border border-border/60">
          <TabsTrigger value="profile" className="text-xs gap-2 py-2 px-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-xs">
            <User className="h-3.5 w-3.5" />
            <span>Perfil de Usuario</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs gap-2 py-2 px-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-xs">
            <Bell className="h-3.5 w-3.5" />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs gap-2 py-2 px-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-xs">
            <Key className="h-3.5 w-3.5" />
            <span>Claves de API</span>
          </TabsTrigger>
          <TabsTrigger value="danger" className="text-xs gap-2 py-2 px-3.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-xs text-destructive">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Zona de Peligro</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. PERFIL */}
        <TabsContent value="profile">
          <form onSubmit={handleSaveProfile}>
            <Card className="border-border/80 bg-card shadow-xs">
              <CardHeader>
                <CardTitle className="text-base font-bold">Datos del Perfil</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Esta información será visible para el resto de miembros del equipo en el panel.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Avatar y cambio de imagen */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-border/80">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">{demoUser.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => toast.info("Selector de archivo", { description: "Simulación de subida de imagen de perfil." })}
                        className="text-xs h-8 cursor-pointer"
                      >
                        Cambiar foto de perfil
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success("Foto restablecida")}
                        className="text-xs h-8 text-muted-foreground cursor-pointer"
                      >
                        Eliminar
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Formatos admitidos: JPG, PNG, WebP hasta 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Nombre Completo</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="text-xs h-9 bg-muted/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Correo Electrónico de Cuenta</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="text-xs h-9 bg-muted/30"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold">Cargo o Título Profesional</Label>
                    <Input
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="text-xs h-9 bg-muted/30"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs font-semibold">Biografía Pública</Label>
                    <Textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="text-xs resize-none bg-muted/30"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 border-t border-border/50 py-3.5 px-6">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Cambios descartados")}
                  className="text-xs cursor-pointer"
                >
                  Descartar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={saving}
                  className="bg-primary text-primary-foreground text-xs gap-1.5 cursor-pointer shadow-xs"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* 2. NOTIFICACIONES */}
        <TabsContent value="notifications">
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Preferencias de Alertas y Notificaciones</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Define cuándo y por qué canal deseas recibir novedades sobre las actividades del equipo.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Notificaciones por Correo</span>
                  <p className="text-[11px] text-muted-foreground">Recibe alertas cuando se te asigne una nueva tarea o trabajo.</p>
                </div>
                <Switch
                  checked={notifications.emailAlerts}
                  onCheckedChange={(val) => {
                    setNotifications({ ...notifications, emailAlerts: val });
                    toast.success("Preferencia actualizada");
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Resumen Semanal de Rendimiento</span>
                  <p className="text-[11px] text-muted-foreground">Informe consolidado cada lunes con horas registradas y métricas.</p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(val) => {
                    setNotifications({ ...notifications, weeklyReport: val });
                    toast.success("Preferencia actualizada");
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Alertas de Seguridad y Nuevos Inicios</span>
                  <p className="text-[11px] text-muted-foreground">Aviso inmediato si se detecta un inicio de sesión desde una nueva IP o dispositivo.</p>
                </div>
                <Switch
                  checked={notifications.securityLogin}
                  onCheckedChange={(val) => {
                    setNotifications({ ...notifications, securityLogin: val });
                    toast.success("Preferencia actualizada");
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Alertas por SMS (Urgencias)</span>
                  <p className="text-[11px] text-muted-foreground">Mensajes de texto solo para incidentes críticos de servidores y facturación.</p>
                </div>
                <Switch
                  checked={notifications.smsAlerts}
                  onCheckedChange={(val) => {
                    setNotifications({ ...notifications, smsAlerts: val });
                    toast.success("Preferencia actualizada");
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. CLAVES DE API */}
        <TabsContent value="api">
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold">Credenciales y Claves de API</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Usa estas claves para conectar tu backend, webhooks o scripts externos con el panel.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Token de Producción (Secreto)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    type="password"
                    value={apiKey}
                    className="font-mono text-xs h-9 bg-muted/40 text-muted-foreground"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopyApiKey}
                    className="gap-1.5 text-xs h-9 cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copiado" : "Copiar"}</span>
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">Nunca compartas esta clave en repositorios públicos.</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border/50">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Generar Nuevo Token</span>
                  <p className="text-[11px] text-muted-foreground">Revocará el token anterior inmediatamente.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Nuevo token generado", { description: "Recuerda actualizar tus variables de entorno (.env)." })}
                  className="text-xs gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Regenerar Clave</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. ZONA DE PELIGRO */}
        <TabsContent value="danger">
          <Card className="border-destructive/30 bg-card shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-bold text-destructive">Acciones Críticas e Irreversibles</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Operaciones que afectan permanentemente los datos almacenados en el navegador o el servidor.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/10">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground">Restablecer Caché y Estado Local</span>
                  <p className="text-[11px] text-muted-foreground">Limpia filtros guardados, estados de paleta y datos temporales en localStorage.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.clear();
                    toast.success("Caché local borrada", { description: "La plantilla se ha reiniciado a sus valores de fábrica." });
                  }}
                  className="text-xs cursor-pointer"
                >
                  Limpiar Caché
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-destructive/20 p-4 bg-destructive/5">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-destructive">Eliminar Cuenta de Espacio de Trabajo</span>
                  <p className="text-[11px] text-muted-foreground">Elimina permanentemente esta organización y revoca todos los permisos de acceso.</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => toast.error("Acción denegada en modo demo", { description: "En producción requeriría confirmación por contraseña." })}
                  className="text-xs cursor-pointer"
                >
                  Eliminar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { dashboardConfig, demoUser } from "@/config/dashboard";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recover, setRecover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Modo demostración iniciado");
    router.push("/");
  }

  return (
    <div className="module-login grid min-h-dvh w-full lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="login-brand flex flex-col justify-between gap-12 bg-sidebar p-6 text-sidebar-foreground sm:p-10 lg:p-12">
        <Link href="/" className="flex w-fit items-center gap-3 text-sm font-semibold">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            {dashboardConfig.initials}
          </span>
          {dashboardConfig.name}
        </Link>
        <div className="hidden max-w-sm space-y-5 lg:block">
          <span className="grid size-12 place-items-center rounded-xl bg-sidebar-accent text-sidebar-primary">
            <LayoutDashboard size={24} aria-hidden />
          </span>
          <p className="text-4xl font-semibold leading-tight tracking-tight">Tu espacio de trabajo</p>
          <p className="text-sm leading-relaxed text-sidebar-foreground/75">Accede al panel para consultar la actividad y administrar tus recursos.</p>
        </div>
        <Link href="/" className="flex w-fit items-center gap-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground">
          <ArrowLeft className="size-4" aria-hidden /> Volver a analítica
        </Link>
      </div>

      <div className="grid place-items-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
            <p className="text-sm text-muted-foreground">Formulario de ejemplo. El acceso es simulado.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input id="password" autoComplete="current-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required className="pr-10" />
                <Button type="button" variant="ghost" size="icon-sm" className="absolute inset-y-0 right-0 my-auto" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                  {showPassword ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
                </Button>
              </div>
            </div>
            <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => setRecover(true)}>¿Olvidaste tu contraseña?</button>
            <Button type="submit" className="w-full">Entrar al panel</Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => {
              setEmail(demoUser.email);
              setPassword("demo-dashboard");
            }}>
              Usar datos de demostración
            </Button>
          </form>
          <Dialog open={recover} onOpenChange={setRecover}><DialogContent>
            <DialogTitle>Recuperar acceso</DialogTitle><DialogDescription>Prueba la solicitud de recuperación con un correo de ejemplo. El envío es simulado.</DialogDescription>
            <form className="grid gap-3" onSubmit={event => {
              event.preventDefault(); setRecover(false); toast.success("Solicitud de recuperación simulada");
            }}>
              <Label htmlFor="recovery-email">Correo de recuperación</Label><Input id="recovery-email" type="email" autoComplete="email" defaultValue={email} required />
              <Button type="submit">Solicitar enlace</Button>
            </form>
          </DialogContent></Dialog>
        </div>
      </div>
    </div>
  );
}

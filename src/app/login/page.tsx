"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("dara.whitfield@morlostudio.com");
  const [password, setPassword] = React.useState("••••••••••••");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Campos requeridos", {
        description: "Por favor ingresa tu correo y contraseña.",
      });
      return;
    }

    setIsLoading(true);
    toast.loading("Verificando credenciales...", { id: "login-toast" });

    setTimeout(() => {
      setIsLoading(false);
      toast.success("¡Bienvenido de nuevo!", {
        id: "login-toast",
        description: "Sesión iniciada como Dara Whitfield.",
      });
      router.push("/");
    }, 1000);
  };

  const handleFillDemo = () => {
    setEmail("dara.whitfield@morlostudio.com");
    setPassword("password123");
    toast.info("Credenciales cargadas", {
      description: "Usuario de demostración listo para iniciar sesión.",
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F7F6] text-foreground">
      {/* Columna Izquierda: Branding & Showcase Nórdico (30% Secondary #0F2A1D) */}
      <div className="lg:w-5/12 bg-[#0F2A1D] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Glow de acento esmeralda */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header de Marca */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-[#0F2A1D] font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block">Morlo Studio</span>
              <span className="text-xs text-emerald-300 font-medium">Plantilla Dashboard SaaS</span>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </div>

        {/* Contenido Central */}
        <div className="relative z-10 my-12 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Módulo 5 · Autenticación & Estados
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Control integral de analíticas, tareas y diseño.
          </h2>

          <p className="text-emerald-100/80 text-sm leading-relaxed">
            Plantilla modular construida con Next.js 16, Tailwind CSS v4, Base UI y una regla cromática 60-30-10 para dashboards SaaS de alto impacto.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Regla 60-30-10 (Lienzo neutro, Verde Nórdico y Esmeralda)",
              "Componentes accesibles y modales nativos con Base UI",
              "Data Tables interactivas con filtrado y paginación",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Izquierdo */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/60">
          <span>© 2026 Morlo Studio UI</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Sesión encriptada
          </span>
        </div>
      </div>

      {/* Columna Derecha: Formulario de Autenticación (60% Primary Surface) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresa tus credenciales para acceder al panel de gestión.
            </p>
          </div>

          {/* Banner de credenciales demo para prueba rápida */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 flex items-center justify-between gap-3">
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-emerald-900 dark:text-emerald-200">
                Acceso rápido de demostración
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">
                dara.whitfield@morlostudio.com
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleFillDemo}
              className="text-xs shrink-0 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer"
            >
              Autocompletar
            </Button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-foreground">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="tu.nombre@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11 bg-card rounded-lg border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold text-foreground">
                  Contraseña
                </Label>
                <button
                  type="button"
                  onClick={() => toast.info("Recuperación de contraseña", { description: "Se ha enviado un enlace a tu correo." })}
                  className="text-xs text-primary hover:underline font-semibold cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Tu contraseña secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 bg-card rounded-lg border-border font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  title={showPassword ? "Ocultar" : "Mostrar"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded-sm border-border text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="remember" className="text-xs text-muted-foreground font-medium cursor-pointer">
                Recordarme durante 30 días
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md cursor-pointer transition-transform active:scale-[0.99]"
            >
              {isLoading ? "Iniciando sesión..." : "Ingresar al Panel"}
            </Button>
          </form>

          {/* Separador */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-[#F4F7F6] px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider absolute">
              o continúa con
            </span>
          </div>

          {/* Botones de Proveedores Sociales */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info("Autenticación con Google", { description: "Redirigiendo a la pantalla de consentimiento..." })}
              className="h-10 bg-card border-border hover:bg-muted text-xs font-semibold cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info("Autenticación con GitHub", { description: "Redirigiendo a autorización OAuth..." })}
              className="h-10 bg-card border-border hover:bg-muted text-xs font-semibold cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Footer de navegación */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              ← Volver al Dashboard principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
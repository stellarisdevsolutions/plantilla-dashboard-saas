"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, KeyRound, LayoutDashboard, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { dashboardConfig, demoUser } from "@/config/dashboard";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register" | "otp";

const DEMO_OTP = "482910";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recover, setRecover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Register state
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);

  // OTP state (6 digits)
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Modo demostración iniciado");
    router.push("/");
  }

  function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (regPassword !== regConfirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (!acceptTerms) {
      toast.warning("Debes aceptar los términos de demostración");
      return;
    }
    toast.success("Cuenta de demostración creada", {
      description: "Introduce el código de verificación 2FA para finalizar.",
    });
    setMode("otp");
  }

  function handleOtpChange(index: number, raw: string) {
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      const next = [...otpDigits];
      next[index] = "";
      setOtpDigits(next);
      return;
    }

    if (clean.length > 1) {
      const spread = clean.slice(0, 6).split("");
      const next = Array.from({ length: 6 }, (_, i) => spread[i] ?? "");
      setOtpDigits(next);
      const focusIdx = Math.min(5, spread.length);
      otpRefs.current[focusIdx]?.focus();
      return;
    }

    const next = [...otpDigits];
    next[index] = clean;
    setOtpDigits(next);
    if (index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, key: string) {
    if (key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = otpDigits.join("");
    if (code.length < 6) {
      toast.error("Ingresa los 6 dígitos del código de verificación");
      return;
    }
    toast.success("Verificación 2FA completada");
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
          <p className="text-sm leading-relaxed text-sidebar-foreground/75">
            Accede al panel para consultar la actividad, administrar recursos y probar los flujos visuales de autenticación.
          </p>
        </div>
        <Link href="/" className="flex w-fit items-center gap-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground">
          <ArrowLeft className="size-4" aria-hidden /> Volver al resumen
        </Link>
      </div>

      <div className="grid place-items-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md space-y-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
          {/* Selector visual de flujo Auth */}
          <div className="grid grid-cols-3 gap-1 rounded-xl border bg-muted/40 p-1" role="tablist" aria-label="Flujo de autenticación">
            {[
              { id: "login", label: "Entrar", icon: KeyRound },
              { id: "register", label: "Registro", icon: UserPlus },
              { id: "otp", label: "2FA / OTP", icon: ShieldCheck },
            ].map(({ id, label, icon: Icon }) => {
              const active = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(id as AuthMode)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer",
                    active
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </button>
              );
            })}
          </div>

          {mode === "login" && (
            <>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
                <p className="text-sm text-muted-foreground">Formulario de ejemplo. El acceso es simulado.</p>
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    autoComplete="username"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute inset-y-0 right-0 my-auto"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline cursor-pointer"
                    onClick={() => setRecover(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => setMode("register")}
                  >
                    Crear una cuenta
                  </button>
                </div>
                <Button type="submit" className="w-full">
                  Entrar al panel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEmail(demoUser.email);
                    setPassword("demo-dashboard");
                  }}
                >
                  Usar datos de demostración
                </Button>
              </form>
            </>
          )}

          {mode === "register" && (
            <>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight">Crear cuenta</h1>
                <p className="text-sm text-muted-foreground">Alta visual de nuevo miembro en modo demostración.</p>
              </div>
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name">Nombre completo</Label>
                  <Input
                    id="reg-name"
                    required
                    placeholder="ej. Lucía Fernández"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email">Correo corporativo</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="lucia@empresa.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-pass">Contraseña</Label>
                    <Input
                      id="reg-pass"
                      type="password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-confirm">Confirmar</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      required
                      minLength={6}
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-border accent-primary"
                  />
                  Acepto los términos de uso y privacidad (demo)
                </label>
                <Button type="submit" className="w-full">
                  Crear cuenta y verificar 2FA
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-xs"
                  onClick={() => setMode("login")}
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </Button>
              </form>
            </>
          )}

          {mode === "otp" && (
            <>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight">Verificación 2FA</h1>
                <p className="text-sm text-muted-foreground">
                  Ingresa el código de 6 dígitos de tu aplicación autenticadora.
                </p>
              </div>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="grid grid-cols-6 gap-2" role="group" aria-label="Código de verificación de 6 dígitos">
                  {otpDigits.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        otpRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      aria-label={`Dígito ${index + 1}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e.key)}
                      className="h-11 text-center font-mono text-base font-bold"
                    />
                  ))}
                </div>
                <Button type="submit" className="w-full">
                  Verificar y entrar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => {
                    setOtpDigits(DEMO_OTP.split(""));
                    toast.info("Código demo rellenado");
                  }}
                >
                  Rellenar código demo ({DEMO_OTP})
                </Button>
              </form>
            </>
          )}

          <Dialog open={recover} onOpenChange={setRecover}>
            <DialogContent>
              <DialogTitle>Recuperar acceso</DialogTitle>
              <DialogDescription>
                Prueba la solicitud de recuperación con un correo de ejemplo. El envío es simulado.
              </DialogDescription>
              <form
                className="grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  setRecover(false);
                  toast.success("Solicitud de recuperación simulada");
                }}
              >
                <Label htmlFor="recovery-email">Correo de recuperación</Label>
                <Input id="recovery-email" type="email" autoComplete="email" defaultValue={email} required />
                <Button type="submit">Solicitar enlace</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

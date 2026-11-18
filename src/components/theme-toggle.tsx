"use client";

import { useHydrated } from "@/lib/use-hydrated";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-8 w-8 border-border/70 bg-card">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-8 w-8 border-border/70 bg-card cursor-pointer shadow-xs transition-colors"
      title={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-primary transition-transform rotate-0" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground transition-transform rotate-0" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}

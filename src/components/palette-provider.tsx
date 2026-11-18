"use client";

import * as React from "react";

export type Palette = "emerald" | "amber" | "zinc" | "indigo" | "violet";

interface PaletteContextType {
  palette: Palette;
  setPalette: (palette: Palette) => void;
  palettes: { id: Palette; name: string; color: string }[];
}

export const PALETTES: { id: Palette; name: string; color: string }[] = [
  { id: "emerald", name: "Esmeralda (Nordic)", color: "#10b981" },
  { id: "indigo", name: "Índigo (SaaS Tech)", color: "#6366f1" },
  { id: "violet", name: "Violeta (AI Studio)", color: "#8b5cf6" },
  { id: "amber", name: "Ámbar (Warm Studio)", color: "#f59e0b" },
  { id: "zinc", name: "Zinc (Monocromo)", color: "#71717a" },
];

const PaletteContext = React.createContext<PaletteContextType | undefined>(undefined);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = React.useState<Palette>("emerald");

  React.useEffect(() => {
    const saved = localStorage.getItem("dashboard-palette") as Palette | null;
    if (saved && PALETTES.some((p) => p.id === saved)) {
      setPaletteState(saved);
      document.documentElement.setAttribute("data-palette", saved);
    } else {
      setPaletteState("emerald");
      document.documentElement.setAttribute("data-palette", "emerald");
    }
  }, []);

  const setPalette = React.useCallback((newPalette: Palette) => {
    setPaletteState(newPalette);
    localStorage.setItem("dashboard-palette", newPalette);
    document.documentElement.setAttribute("data-palette", newPalette);
  }, []);

  return (
    <PaletteContext.Provider value={{ palette, setPalette, palettes: PALETTES }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = React.useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette debe usarse dentro de un PaletteProvider");
  }
  return context;
}

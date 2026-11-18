"use client";

import * as React from "react";
import { dashboardConfig } from "@/config/dashboard";

export type Palette = "cobalt" | "orange" | "coral" | "emerald" | "amber" | "zinc" | "indigo" | "violet";

const palettes: { id: Palette; name: string; color: string }[] = [
  { id: "cobalt", name: "Cobalto", color: "#7095ff" },
  { id: "orange", name: "Naranja", color: "#f77742" },
  { id: "coral", name: "Coral", color: "#b7432d" },
  { id: "indigo", name: "Índigo", color: "#4f46e5" },
  { id: "emerald", name: "Esmeralda", color: "#047857" },
  { id: "violet", name: "Violeta", color: "#7c3aed" },
  { id: "amber", name: "Ámbar", color: "#b45309" },
  { id: "zinc", name: "Zinc", color: "#52525b" },
];

const storageKey = "dashboard-palette";
const paletteChange = "dashboard-palette-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(paletteChange, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(paletteChange, callback);
  };
}

const getDefaultPalette = (): Palette => dashboardConfig.defaultPalette;

function getPalette(): Palette {
  const saved = window.localStorage.getItem(storageKey);
  return palettes.find(({ id }) => id === saved)?.id ?? getDefaultPalette();
}

function setPalette(palette: Palette) {
  window.localStorage.setItem(storageKey, palette);
  window.dispatchEvent(new Event(paletteChange));
}

const PaletteContext = React.createContext<{
  palette: Palette;
  setPalette: typeof setPalette;
  palettes: typeof palettes;
} | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const palette = React.useSyncExternalStore(subscribe, getPalette, getDefaultPalette);

  React.useEffect(() => {
    document.documentElement.dataset.palette = palette;
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette, palettes }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = React.useContext(PaletteContext);
  if (!context) throw new Error("usePalette debe usarse dentro de un PaletteProvider");
  return context;
}

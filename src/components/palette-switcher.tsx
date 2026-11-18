"use client";

import * as React from "react";
import { usePalette, Palette } from "./palette-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Palette as PaletteIcon, Check } from "lucide-react";

export function PaletteSwitcher() {
  const { palette, setPalette, palettes } = usePalette();

  const current = palettes.find((p) => p.id === palette) || palettes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 h-8 rounded-md border border-border/70 bg-card px-2.5 text-xs font-medium shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer">
        <span
          className="h-3 w-3 rounded-full border border-black/10 shadow-xs"
          style={{ backgroundColor: current.color }}
        />
        <span className="hidden sm:inline">{current.name.split(" ")[0]}</span>
        <PaletteIcon className="h-3.5 w-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Paleta de colores</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {palettes.map((p) => (
          <DropdownMenuItem
            key={p.id}
            onClick={() => setPalette(p.id)}
            className="flex items-center justify-between py-2 text-xs cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: p.color }}
              />
              <span className="font-medium">{p.name}</span>
            </div>
            {palette === p.id && <Check className="h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

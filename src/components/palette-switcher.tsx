"use client";

import { Palette as PaletteIcon } from "lucide-react";
import { usePalette } from "./palette-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PaletteSwitcher() {
  const { palette, setPalette, palettes } = usePalette();
  const current = palettes.find(({ id }) => id === palette) ?? palettes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Paleta de colores" title={current.name} className="grid size-8 place-items-center rounded-full border bg-card shadow-xs hover:bg-accent">
        <PaletteIcon className="size-3.5 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Paleta de colores" className="w-40">
        <DropdownMenuRadioGroup value={palette} onValueChange={(value) => {
          const selected = palettes.find(({ id }) => id === value);
          if (selected) setPalette(selected.id);
        }}>
          {palettes.map(({ id, name }) => (
            <DropdownMenuRadioItem key={id} value={id} className="gap-2 py-2 text-xs">
              <span aria-hidden className="size-3 rounded-full border border-border" style={{ backgroundColor: `var(--brand-${id})` }} />
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

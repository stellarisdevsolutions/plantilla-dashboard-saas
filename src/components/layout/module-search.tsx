"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { navigation } from "@/config/navigation";

const entries = navigation.flatMap(({ title, href, icon, examples = [] }) => [
  { title, href, icon },
  ...examples.map((example) => ({ ...example, icon })),
]);

function normalize(value: string) {
  return value.toLocaleLowerCase("es").normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function ModuleSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const term = normalize(query.trim());
  const matches = entries.filter(({ title }) => normalize(title).includes(term));

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.defaultPrevented || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
      if (document.querySelector('[data-slot="dialog-content"][data-open]')) return;
      event.preventDefault();
      triggerRef.current?.click();
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => {
      if (nextOpen) setQuery("");
      setOpen(nextOpen);
    }}>
      <DialogTrigger
        ref={triggerRef}
        render={<Button variant="outline" className="h-9 w-9 gap-2 rounded-lg bg-muted p-0 text-muted-foreground sm:w-56 sm:justify-start sm:px-2.5" />}
        aria-label="Buscar módulos"
        aria-keyshortcuts="Control+k Meta+k"
      >
        <Search aria-hidden className="size-4" />
        <span className="hidden flex-1 text-start text-xs sm:inline">Buscar módulos</span>
        <kbd className="hidden rounded border bg-card px-1 text-[10px] leading-5 lg:inline">Ctrl K</kbd>
      </DialogTrigger>
      <DialogContent
        initialFocus={inputRef}
        className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md"
      >
        <DialogTitle>Buscar módulos</DialogTitle>
        <DialogDescription>Abre una sección del panel.</DialogDescription>
        <Input
          ref={inputRef}
          type="search"
          aria-label="Nombre del módulo"
          placeholder="Escribe un nombre"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {matches.length ? (
          <ul className="grid gap-1">
            {matches.map(({ title, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring">
                  <Icon className="size-4 text-primary" aria-hidden />
                  <span className="flex-1">{title}</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="px-2 pb-2 text-muted-foreground">No se encontraron módulos.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

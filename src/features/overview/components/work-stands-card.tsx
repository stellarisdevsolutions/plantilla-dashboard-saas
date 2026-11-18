import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WORK_STANDS } from "../data";

export function WorkStandsCard() {
  return (
    <Card className="min-w-0 rounded-xl">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 p-4 sm:px-5">
        <h2 className="text-sm font-semibold">Avance por categoría</h2>
        <span className="text-xs text-muted-foreground">Completados</span>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5">
        <ul className="space-y-3">
          {WORK_STANDS.map(({ name, done, moving, waiting, total }) => (
            <li key={name} className="grid grid-cols-[5rem_minmax(0,1fr)_3.4rem] items-center gap-2 text-xs">
              <span className="font-medium">{name}</span>
              <meter
                aria-label={`${name} completadas`}
                title={`${done} completados · ${moving} en curso · ${waiting} en espera`}
                min={0}
                max={total || 1}
                value={done}
                className="category-meter h-2.5 w-full"
              />
              <span className="text-end text-muted-foreground tabular-nums">{done} / {total}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

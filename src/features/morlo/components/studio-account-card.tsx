"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { STUDIO_ACCOUNT } from "../data";
import { Wallet, ArrowUpRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function StudioAccountCard() {
  return (
    <Card className="relative overflow-hidden border-0 bg-primary text-primary-foreground shadow-lg rounded-xl transition-transform hover:scale-[1.01]">
      <CardContent className="p-7 flex flex-col justify-between h-full space-y-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 opacity-90" />
            <span className="text-[11px] font-bold tracking-widest uppercase opacity-90">
              Cuenta del estudio
            </span>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Balance contable", { description: "Abriendo desglose de facturación y cobros." })}
            className="rounded-full bg-black/15 p-2 hover:bg-black/25 transition-colors cursor-pointer"
            aria-label="Abrir balance contable"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Balance grande */}
        <div className="space-y-1">
          <div className="text-4xl sm:text-5xl font-black tracking-tight font-sans">
            {STUDIO_ACCOUNT.totalBalance}
          </div>
        </div>

        {/* Submétricas */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/10">
          <div>
            <span className="text-xs font-medium opacity-75 block">Esperando cobro</span>
            <span className="text-sm font-bold font-mono block mt-1">
              {STUDIO_ACCOUNT.waitingToBePaid}
            </span>
          </div>
          <div>
            <span className="text-xs font-medium opacity-75 block">Esta semana</span>
            <span className="text-sm font-bold font-mono block mt-1">
              {STUDIO_ACCOUNT.inThisWeek}
            </span>
          </div>
        </div>

        {/* Alerta de factura vencida */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/25 backdrop-blur-xs px-3.5 py-1.5 text-xs font-semibold">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-200" />
            <span>{STUDIO_ACCOUNT.overdueInvoicesCount} factura vencida</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

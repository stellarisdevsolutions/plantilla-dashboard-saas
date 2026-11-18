"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { REVIEW_DEMO_DATA } from "../data";
import { ThumbsUp, ArrowUpRight } from "lucide-react";

export function StarMixCard() {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm rounded-xl flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-bold tracking-tight text-foreground">
            Distribución de estrellas
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5 font-medium">
            {REVIEW_DEMO_DATA.totalPublicReviews} opiniones públicas
          </CardDescription>
        </div>
        <div className="rounded-full bg-muted/50 p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1 px-6 pb-6">
        {/* Barras de distribución */}
        <div className="space-y-2.5">
          {REVIEW_DEMO_DATA.starMix.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-6 text-muted-foreground font-mono font-semibold text-[11px]">
                {item.stars} ★
              </span>
              <div className="flex-1 h-3 overflow-hidden rounded-full bg-muted/70 p-0.5">
                <div
                  style={{ width: `${item.percentage}%` }}
                  className="h-full rounded-full bg-foreground transition-all duration-500 shadow-xs"
                />
              </div>
              <span className="w-8 text-right font-mono text-[11px] font-bold text-muted-foreground">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Badge inferior de fidelización */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ThumbsUp className="h-3.5 w-3.5" />
          </div>
          <span className="text-[11px] font-medium leading-snug">
            {REVIEW_DEMO_DATA.bookingRate}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

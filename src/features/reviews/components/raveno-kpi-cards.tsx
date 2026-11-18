"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RAVENO_DATA } from "../data";
import { Star, Award, ThumbsDown, Camera, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RavenoKpiCardsProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function RavenoKpiCards({
  selectedId = "new-reviews",
  onSelect,
}: RavenoKpiCardsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "new-reviews":
        return <Star className="h-4 w-4 text-muted-foreground" />;
      case "top-tier":
        return <Award className="h-4 w-4 text-muted-foreground" />;
      case "low-ratings":
        return <ThumbsDown className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Camera className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {RAVENO_DATA.kpiCards.map((card) => {
        const isSelected = selectedId === card.id;

        return (
          <Card
            key={card.id}
            onClick={() => onSelect?.(card.id)}
            className={cn(
              "shadow-sm rounded-xl transition-all cursor-pointer overflow-hidden",
              isSelected
                ? "border-primary/50 bg-card/95 ring-1 ring-primary/40 shadow-md"
                : "border-border/60 bg-card/80 hover:border-border hover:bg-card/95"
            )}
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground tracking-tight">
                  {card.title}
                </span>
                {getIcon(card.id)}
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-foreground">
                  {card.count}
                </div>

                {/* Sparkline de onda */}
                <div className="flex items-end gap-1 h-6">
                  {card.sparkline.map((val, i) => (
                    <div
                      key={i}
                      style={{ height: `${(val / 45) * 100}%` }}
                      className={cn(
                        "w-1 rounded-full transition-all duration-300",
                        isSelected
                          ? "bg-primary"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                <TrendingUp className={cn("h-3 w-3", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span>{card.change}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

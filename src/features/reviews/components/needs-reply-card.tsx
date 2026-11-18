"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { REVIEW_DEMO_DATA } from "../data";
import { Star, MessageSquare, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function NeedsReplyCard() {
  const [selectedReview, setSelectedReview] = React.useState<typeof REVIEW_DEMO_DATA.needsReplyReviews[0] | null>(null);
  const [replyText, setReplyText] = React.useState("");

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast.success("Respuesta enviada", {
      description: `Se publicó tu mensaje para ${selectedReview?.authorInfo.split(" • ")[0]}.`,
    });
    setSelectedReview(null);
    setReplyText("");
  };

  return (
    <>
      <Card className="border-border/60 bg-card/95 shadow-sm rounded-xl overflow-hidden h-full flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-bold tracking-tight text-foreground">
              Pendientes de respuesta
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5 font-medium">
              Respuestas prioritarias para mantener el compromiso de 24h
            </CardDescription>
          </div>
          <span className="text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1 transition-colors">
            Ver todas 16 <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </CardHeader>
        <CardContent className="space-y-3 pt-1 px-6 pb-6">
          {REVIEW_DEMO_DATA.needsReplyReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9 shrink-0 ring-1 ring-border/50">
                  <AvatarFallback className="text-xs font-bold bg-muted text-foreground">
                    {rev.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-foreground truncate">
                      {rev.title}
                    </span>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {rev.authorInfo}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReview(rev)}
                className="h-7.5 px-3 text-[11px] font-semibold rounded-xl border-border/60 bg-card hover:bg-muted cursor-pointer shrink-0 ml-3"
              >
                <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                Responder
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal de respuesta */}
      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-md rounded-xl border-border/80 bg-card">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">
              Responder a reseña
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {selectedReview?.title} — {selectedReview?.authorInfo}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-2xl border border-border/50 bg-muted/30 p-3 text-xs italic text-muted-foreground">
              &quot;{selectedReview?.content}&quot;
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reply-text" className="text-xs font-semibold text-foreground">
                Tu respuesta oficial
              </label>
              <Textarea
                id="reply-text"
                rows={3}
                placeholder="Escribe una respuesta profesional y cercana..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="rounded-2xl bg-muted/40 text-xs border-border/60 focus-visible:bg-card"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedReview(null)}
              className="rounded-xl text-xs"
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleSendReply}
              disabled={!replyText.trim()}
              className="rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90"
            >
              Publicar respuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

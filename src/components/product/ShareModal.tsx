import { useState } from "react";
import { Check, Copy, Facebook, Instagram, Link2, Send, Share2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/types";
import {
  canNativeShare,
  copyToClipboard,
  nativeShare,
  shareTargets,
} from "@/lib/share";
import { openExternal, track } from "@/lib/analytics";

export function ShareModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  if (!product) return null;

  const targets = shareTargets(product);

  const handleCopy = async () => {
    const ok = await copyToClipboard(targets.url);
    setCopied(ok);
    track("share_copy", { slug: product.slug });
    toast[ok ? "success" : "error"](ok ? "Link copied" : "Could not copy the link");
    if (ok) setTimeout(() => setCopied(false), 2000);
  };

  const options = [
    {
      label: "WhatsApp",
      icon: <Send aria-hidden />,
      onClick: () => {
        track("share_whatsapp", { slug: product.slug });
        openExternal(targets.whatsapp);
      },
      highlight: true,
    },
    {
      label: "Facebook",
      icon: <Facebook aria-hidden />,
      onClick: () => openExternal(targets.facebook),
    },
    {
      label: "X",
      icon: <span className="text-sm font-bold">X</span>,
      onClick: () => openExternal(targets.x),
    },
    {
      label: "Instagram",
      icon: <Instagram aria-hidden />,
      onClick: async () => {
        await handleCopy();
        toast.info("Link copied — paste it in your Instagram story or bio.");
      },
    },
  ];

  return (
    <Dialog open={!!product} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="glass-strong max-w-md rounded-3xl border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Share this surprise</DialogTitle>
          <DialogDescription>
            Send {product.name} to someone who needs a moment made for them.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={o.onClick}
              aria-label={`Share on ${o.label}`}
              className={`focus-ring flex items-center gap-2.5 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                o.highlight
                  ? "bg-success/12 text-success hover:bg-success/20"
                  : "bg-secondary/60 text-foreground hover:bg-secondary"
              }`}
            >
              <span className="grid size-8 place-items-center rounded-xl bg-background/40">
                {o.icon}
              </span>
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border bg-background/50 p-2 pl-3.5">
          <Link2 className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
            {targets.url}
          </span>
          <Button variant="soft" size="sm" className="shrink-0 rounded-xl" onClick={handleCopy}>
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        {canNativeShare() ? (
          <Button variant="hero" size="pill" onClick={() => nativeShare(product)}>
            <Share2 aria-hidden />
            More sharing options
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

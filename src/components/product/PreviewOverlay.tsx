import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Gift, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/common/States";
import { GRAB_LABEL } from "@/config/site";
import type { Product } from "@/data/types";
import { openExternal } from "@/lib/analytics";

/**
 * Full-screen live preview of the product's existing preview_url.
 * Bhopali Mitra never recreates the experience — it only frames it, and
 * falls back to a new tab when the external site blocks embedding.
 */
export function PreviewOverlay({
  product,
  onClose,
  onShare,
  onGrab,
}: {
  product: Product | null;
  onClose: () => void;
  onShare: (product: Product) => void;
  onGrab: (product: Product) => void;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!product) return;
    setStatus("loading");
    const timer = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, 6000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Live preview of ${product.name}`}
      className="animate-fade-up fixed inset-0 z-[60] flex flex-col bg-background"
    >
      <header className="glass-strong grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-3 py-2.5 sm:flex sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="soft" size="sm" className="shrink-0 rounded-full" onClick={onClose}>
            <ArrowLeft aria-hidden />
            <span className="hidden sm:inline">Back to Bhopali Mitra</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <p className="min-w-0 truncate text-sm font-semibold">{product.name}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Share preview"
            onClick={() => onShare(product)}
          >
            <Share2 aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open preview in a new tab"
            onClick={() => openExternal(product.preview_url)}
          >
            <ExternalLink aria-hidden />
          </Button>
          <Button variant="grab" size="sm" className="rounded-full" onClick={() => onGrab(product)}>
            <Gift aria-hidden />
            <span className="hidden sm:inline">{GRAB_LABEL}</span>
            <span className="sm:hidden">Grab</span>
          </Button>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden">
        {status === "error" ? (
          <div className="mx-auto flex h-full max-w-lg items-center px-5">
            <div className="w-full">
              <ErrorState
                icon="🌙"
                title="Looks like this surprise is taking a little break."
                description="The live preview could not be embedded here. You can still open it in a new tab."
                actionLabel="Back to Projects"
                actionTo="/projects"
              />
              <div className="mt-4 flex justify-center">
                <Button
                  variant="hero"
                  size="pill"
                  onClick={() => openExternal(product.preview_url)}
                >
                  <ExternalLink aria-hidden />
                  Open preview in new tab
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {status === "loading" ? (
              <div className="absolute inset-0 grid place-items-center bg-background">
                <div className="flex flex-col items-center gap-4">
                  <span className="block size-10 animate-spin-slow rounded-full border-2 border-primary/25 border-t-primary" />
                  <p className="text-sm text-muted-foreground">Loading live preview…</p>
                </div>
              </div>
            ) : null}
            <iframe
              key={product.slug}
              src={product.preview_url}
              title={`${product.name} live preview`}
              className="size-full border-0"
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("error")}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </>
        )}
      </div>
    </div>
  );
}

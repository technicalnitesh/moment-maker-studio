import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, PartyPopper, Sparkles } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/common/Pill";
import { DOWNLOAD_LABEL, GRAB_LABEL } from "@/config/site";
import type { Product } from "@/data/types";
import { deliverDownload } from "@/lib/analytics";
import { copyToClipboard } from "@/lib/share";
import { categoryName } from "@/lib/catalog";

type Phase = "preparing" | "getting-ready" | "ready";

const PHASE_COPY: Record<Phase, { title: string; hint: string }> = {
  preparing: { title: "Preparing your project…", hint: "Unpacking the experience" },
  "getting-ready": { title: "Getting everything ready…", hint: "Almost there" },
  ready: { title: "Your project is ready!", hint: "Copy your grab code and download" },
};

export function GrabModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("preparing");
  const [progress, setProgress] = useState(6);
  const [copied, setCopied] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

useEffect(() => {
  timers.current.forEach(clearTimeout);
  timers.current = [];

  if (!product) return;

  setPhase("preparing");
  setProgress(8);
  setCopied(false);

  // 0.5 seconds
  timers.current.push(
    setTimeout(() => {
      setProgress(20);
    }, 500),
  );

  // 10 seconds
  timers.current.push(
    setTimeout(() => {
      setPhase("getting-ready");
      setProgress(45);
    }, 10000),
  );

  // 20 seconds
  timers.current.push(
    setTimeout(() => {
      setProgress(70);
    }, 20000),
  );

  // 30 seconds
  timers.current.push(
    setTimeout(() => {
      setPhase("ready");
      setProgress(100);
    }, 30000),
  );

  return () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
}, [product]);

  if (!product) return null;
  const copy = PHASE_COPY[phase];

  const handleCopy = async () => {
    const ok = await copyToClipboard(product.grab_code);
    setCopied(ok);
    toast[ok ? "success" : "error"](
      ok ? "Grab code copied" : "Could not copy — please copy manually",
    );
    if (ok) setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const ok = deliverDownload(product);
    if (!ok) {
      toast.error("Download is temporarily unavailable.");
      return;
    }
    toast.success("Opening your download…");
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DialogContent className="glass-strong max-w-md overflow-hidden rounded-3xl border-border p-0">
        <div
          aria-hidden
          className="animate-drift bg-gradient-brand pointer-events-none absolute -top-28 left-1/2 size-64 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        />
        <div className="relative p-6 sm:p-8">
          <DialogHeader className="space-y-2 text-center">
            <div className="mx-auto mb-2 grid size-16 place-items-center rounded-2xl bg-primary/12">
              {phase === "ready" ? (
                <PartyPopper className="size-7 text-primary" aria-hidden />
              ) : (
                <span className="block size-7 animate-spin-slow rounded-full border-2 border-primary/25 border-t-primary" />
              )}
            </div>
            <DialogTitle className="text-center text-2xl font-bold">
              {copy.title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              {phase === "ready" ? product.name : copy.hint}
            </DialogDescription>
          </DialogHeader>

          <div
            className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${GRAB_LABEL} progress`}
          >
            <div
              className="bg-gradient-brand h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {phase === "ready" ? (
            <div className="animate-fade-up mt-6 space-y-5">
              <div className="card-surface rounded-2xl p-5 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  Your grab code
                </p>
                <p className="text-gradient mt-2 font-display text-2xl font-bold tracking-[0.14em] sm:text-3xl">
                  {product.grab_code}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Pill tone="category">{categoryName(product.category)}</Pill>
                  {product.is_free ? <Pill tone="free">Free</Pill> : null}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <Button variant="soft" size="pill" onClick={handleCopy}>
                  {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
                <Button variant="grab" size="xl" onClick={handleDownload}>
                  <Download aria-hidden />
                  {DOWNLOAD_LABEL}
                </Button>
              </div>
              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Sparkles className="size-3.5" aria-hidden />
                Free forever. Keep the code for support requests.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Hang on — we're lining up your surprise.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

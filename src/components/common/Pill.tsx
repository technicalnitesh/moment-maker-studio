import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "free" | "trending" | "new" | "neutral" | "category";

const toneClass: Record<Tone, string> = {
  free: "bg-success/15 text-success border-success/30",
  trending: "bg-gradient-warm text-primary-foreground border-transparent",
  new: "bg-gradient-cool text-primary-foreground border-transparent",
  neutral: "bg-secondary text-secondary-foreground border-border",
  category: "bg-primary/12 text-primary border-primary/25",
};

export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

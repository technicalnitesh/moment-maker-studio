import { cn } from "@/lib/utils";

/**
 * Reusable ad placeholder. No fake ads are rendered — this reserves a
 * clean, layout-stable slot so Google AdSense can be dropped in later.
 */
export function AdSlot({
  id,
  format = "horizontal",
  className,
}: {
  id: string;
  format?: "horizontal" | "square" | "inline";
  className?: string;
}) {
  const heights = {
    horizontal: "min-h-[110px] sm:min-h-[128px]",
    square: "min-h-[260px]",
    inline: "min-h-[90px]",
  } as const;

  return (
    <aside
      aria-label="Advertisement space"
      data-ad-slot={id}
      className={cn(
        "flex w-full items-center justify-center rounded-3xl border border-dashed border-border/70 bg-surface/40 px-6 text-center",
        heights[format],
        className,
      )}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground/70">
        Ad space
      </span>
    </aside>
  );
}

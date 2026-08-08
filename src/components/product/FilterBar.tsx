import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/products";
import type { ProductFilterKey } from "@/data/types";
import { cn } from "@/lib/utils";

const STATUS_FILTERS: { key: ProductFilterKey; label: string }[] = [
  { key: "trending", label: "🔥 Trending" },
  { key: "new", label: "✨ New" },
  { key: "free", label: "💚 Free" },
];

function FilterChips({
  active,
  onToggle,
  onClear,
}: {
  active: ProductFilterKey[];
  onToggle: (key: ProductFilterKey) => void;
  onClear: () => void;
}) {
  const items: { key: ProductFilterKey; label: string }[] = [
    ...categories.map((c) => ({ key: c.slug as ProductFilterKey, label: `${c.emoji} ${c.name}` })),
    ...STATUS_FILTERS,
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = active.includes(item.key);
        return (
          <button
            key={item.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(item.key)}
            className={cn(
              "focus-ring rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200",
              isActive
                ? "border-transparent bg-gradient-brand text-primary-foreground"
                : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
      {active.length ? (
        <button
          type="button"
          onClick={onClear}
          className="focus-ring inline-flex items-center gap-1 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden />
          Clear
        </button>
      ) : null}
    </div>
  );
}

export function FilterBar({
  active,
  onToggle,
  onClear,
  resultCount,
}: {
  active: ProductFilterKey[];
  onToggle: (key: ProductFilterKey) => void;
  onClear: () => void;
  resultCount: number;
}) {
  return (
    <div className="w-full">
      {/* Desktop / tablet */}
      <div className="hidden sm:block">
        <FilterChips active={active} onToggle={onToggle} onClear={onClear} />
      </div>

      {/* Mobile bottom sheet */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span> projects
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="soft" size="pill">
              <SlidersHorizontal aria-hidden />
              Filters{active.length ? ` (${active.length})` : ""}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="glass-strong rounded-t-3xl border-border">
            <SheetHeader className="text-left">
              <SheetTitle>Filter projects</SheetTitle>
            </SheetHeader>
            <div className="pt-4">
              <FilterChips active={active} onToggle={onToggle} onClear={onClear} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

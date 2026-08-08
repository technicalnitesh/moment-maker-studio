import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SearchResultsSkeleton } from "@/components/common/Skeletons";
import { products } from "@/data/products";
import { categoryEmoji, categoryName } from "@/lib/catalog";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/types";

const PLACEHOLDER = "Search birthday surprises, love experiences, proposals...";

function search(term: string): Product[] {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter((p) => p.status === "published")
    .filter((p) =>
      [p.name, p.category, p.occasion, p.short_description, p.description, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
    .slice(0, 8);
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [term, setTerm] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) setTerm("");
  }, [open]);

  useEffect(() => {
    if (!term) {
      setPending(false);
      return;
    }
    setPending(true);
    const t = setTimeout(() => {
      setPending(false);
      track("search", { term });
    }, 220);
    return () => clearTimeout(t);
  }, [term]);

  const results = useMemo(() => search(term), [term]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong top-[12%] max-w-xl translate-y-0 gap-0 rounded-3xl border-border p-0">
        <DialogTitle className="sr-only">Search projects</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={PLACEHOLDER}
            aria-label="Search projects"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!term ? (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              Try “birthday”, “proposal”, “love letter” or “memories”.
            </p>
          ) : pending ? (
            <div className="p-2">
              <SearchResultsSkeleton />
            </div>
          ) : results.length ? (
            <ul className="space-y-1.5">
              {results.map((p, i) => (
                <li key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <Link
                    to="/project/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => onOpenChange(false)}
                    className="focus-ring flex items-center gap-3 rounded-2xl p-2 transition-colors duration-200 hover:bg-secondary/70"
                  >
                    <img
                      src={p.thumbnail_url}
                      alt=""
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{p.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {categoryEmoji(p.category)} {categoryName(p.category)} ·{" "}
                        {p.short_description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              Nothing matched “{term}”. Try another occasion.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

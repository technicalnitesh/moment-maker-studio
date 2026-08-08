import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterBar } from "@/components/product/FilterBar";
import { AdSlot } from "@/components/common/AdSlot";
import { productsSync } from "@/lib/catalog";
import type { ProductFilterKey } from "@/data/types";

const TITLE = "All Projects — Interactive Digital Surprises | Bhopali Mitra";
const DESCRIPTION =
  "Browse every interactive digital experience on Bhopali Mitra — birthdays, anniversaries, proposals, love, memories and celebrations. Preview live and grab free.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filters, setFilters] = useState<ProductFilterKey[]>([]);
  const all = productsSync();

  const results = useMemo(() => {
    if (!filters.length) return all;
    return all.filter((p) =>
      filters.every((f) =>
        f === "trending"
          ? p.is_trending
          : f === "new"
            ? p.is_new
            : f === "free"
              ? p.is_free
              : p.category === f,
      ),
    );
  }, [all, filters]);

  const toggle = (key: ProductFilterKey) =>
    setFilters((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">All projects</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
          Every surprise, <span className="text-gradient">ready to grab</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Preview any experience live before you grab it. Everything is free right now.
        </p>
      </header>

      <div className="mt-8">
        <FilterBar
          active={filters}
          onToggle={toggle}
          onClear={() => setFilters([])}
          resultCount={results.length}
        />
      </div>

      <p className="mt-6 hidden text-sm text-muted-foreground sm:block">
        <span className="font-semibold text-foreground">{results.length}</span> projects
      </p>

      <div className="mt-6">
        <ProductGrid products={results} />
      </div>

      <AdSlot id="projects-bottom" className="mt-12" />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { CategoryCard } from "@/components/product/CategoryCard";
import { Reveal } from "@/components/common/Reveal";
import { AdSlot } from "@/components/common/AdSlot";
import { categories } from "@/data/products";

const TITLE = "Browse Categories by Occasion | Bhopali Mitra";
const DESCRIPTION =
  "Explore interactive digital experiences by occasion — birthday, anniversary, love, proposal, memories, celebration, friendship and special moments.";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Categories</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
          Explore by <span className="text-gradient">occasion</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every moment deserves its own kind of surprise. Start with the occasion.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 50}>
            <CategoryCard category={c} className="h-full" />
          </Reveal>
        ))}
      </div>

      <AdSlot id="categories-bottom" className="mt-12" />
    </div>
  );
}

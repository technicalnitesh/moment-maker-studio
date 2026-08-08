import { createFileRoute } from "@tanstack/react-router";

import { ProductGrid } from "@/components/product/ProductGrid";
import { productsSync } from "@/lib/catalog";
import { BRAND_NAME } from "@/config/site";

const TITLE = `Trending Digital Surprises | ${BRAND_NAME}`;
const DESCRIPTION =
  "The interactive digital experiences everyone is previewing and grabbing right now on Bhopali Mitra.";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/trending" },
    ],
    links: [{ rel: "canonical", href: "/trending" }],
  }),
  component: TrendingPage,
});

function TrendingPage() {
  const products = productsSync().filter((p) => p.is_trending);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Trending now</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
          🔥 What everyone is <span className="text-gradient">grabbing</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The most previewed and most shared experiences this week.
        </p>
      </header>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

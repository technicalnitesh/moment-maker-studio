import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProductGrid } from "@/components/product/ProductGrid";
import { AdSlot } from "@/components/common/AdSlot";
import { categoryBySlugSync, productsSync } from "@/lib/catalog";
import { BRAND_NAME } from "@/config/site";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlugSync(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} Digital Surprises | ${BRAND_NAME}`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
        { property: "og:url", content: `/category/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const products = productsSync().filter((p) => p.category === category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Category</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
          {category.emoji} <span className="text-gradient">{category.name}</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </header>

      <div className="mt-10">
        <ProductGrid
          products={products}
          emptyTitle={`No ${category.name} projects yet`}
          emptyDescription="New experiences are added regularly — check the full collection meanwhile."
        />
      </div>

      <AdSlot id="category-bottom" className="mt-12" />
    </div>
  );
}

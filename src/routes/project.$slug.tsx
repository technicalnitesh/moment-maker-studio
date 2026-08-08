import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Eye, Gift, Heart, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/common/Pill";
import { AdSlot } from "@/components/common/AdSlot";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useProductActions } from "@/components/product/ProductActionsProvider";
import { BRAND_NAME, GRAB_LABEL, PREVIEW_LABEL } from "@/config/site";
import { categoryEmoji, categoryName, productBySlugSync, productsSync } from "@/lib/catalog";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const product = productBySlugSync(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: `Experience unavailable | ${BRAND_NAME}` },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Free Interactive Experience | ${BRAND_NAME}`;
    return {
      meta: [
        { title },
        { name: "description", content: product.short_description },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.short_description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/project/${params.slug}` },
        { name: "twitter:title", content: product.name },
        { name: "twitter:description", content: product.short_description },
      ],
      links: [{ rel: "canonical", href: `/project/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            category: categoryName(product.category),
            brand: { "@type": "Brand", name: BRAND_NAME },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { product } = Route.useLoaderData();
  const { openPreview, openGrab, openShare } = useProductActions();

  useEffect(() => {
    track("product_view", { slug: product.slug });
  }, [product.slug]);

  const related = productsSync()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="focus-ring hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <Link
          to="/category/$slug"
          params={{ slug: product.category }}
          className="focus-ring hover:text-foreground"
        >
          {categoryName(product.category)}
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card-surface overflow-hidden rounded-4xl p-2.5">
          <img
            src={product.thumbnail_url}
            alt={`${product.name} — ${categoryName(product.category)} interactive digital experience`}
            width={1200}
            height={800}
            className="aspect-[3/2] w-full rounded-3xl object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="category">
              {categoryEmoji(product.category)} {categoryName(product.category)}
            </Pill>
            {product.is_free ? <Pill tone="free">Free</Pill> : null}
            {product.is_trending ? <Pill tone="trending">🔥 Trending</Pill> : null}
            {product.is_new ? <Pill tone="new">New</Pill> : null}
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {product.short_description}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="text-gradient mt-4 text-sm font-bold">{product.social_tag}</p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Button variant="soft" size="xl" onClick={() => openPreview(product)}>
              <Eye aria-hidden />
              {PREVIEW_LABEL}
            </Button>
            <Button variant="grab" size="xl" onClick={() => openGrab(product)}>
              <Gift aria-hidden />
              {GRAB_LABEL}
            </Button>
            <Button
              variant="ghost"
              size="xl"
              aria-label={`Share ${product.name}`}
              onClick={() => openShare(product)}
            >
              <Share2 aria-hidden />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <section className="card-surface rounded-3xl p-6">
          <h2 className="text-xl font-bold">Features</h2>
          <ul className="mt-4 grid gap-2.5">
            {product.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface rounded-3xl p-6">
          <h2 className="text-xl font-bold">Perfect For</h2>
          <ul className="mt-4 grid gap-2.5">
            {product.perfect_for.map((f: string) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Heart className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AdSlot id="project-detail" className="mt-12" />

      {related.length ? (
        <section className="mt-14">
          <h2 className="text-2xl font-bold">More {categoryName(product.category)} surprises</h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </article>
  );
}

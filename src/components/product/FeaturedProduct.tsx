import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Gift, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/common/Pill";
import { Reveal } from "@/components/common/Reveal";
import { GRAB_LABEL, PREVIEW_LABEL } from "@/config/site";
import type { Product } from "@/data/types";
import { categoryEmoji, categoryName } from "@/lib/catalog";
import { useProductActions } from "@/components/product/ProductActionsProvider";

export function FeaturedProduct({ product }: { product: Product }) {
  const { openPreview, openGrab } = useProductActions();

  return (
    <Reveal className="relative">
      <div className="card-surface hairline-top relative overflow-hidden rounded-4xl">
        <div
          aria-hidden
          className="animate-pulse-glow bg-gradient-brand pointer-events-none absolute -left-24 -top-24 size-72 rounded-full opacity-25 blur-3xl"
        />
        <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden lg:order-2">
            <img
              src={product.thumbnail_url}
              alt={`${product.name} — featured ${categoryName(product.category)} experience`}
              width={1200}
              height={800}
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent lg:bg-gradient-to-r"
            />
          </div>

          <div className="relative p-6 sm:p-9 lg:order-1 lg:p-11">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="category">
                {categoryEmoji(product.category)} {categoryName(product.category)}
              </Pill>
              {product.is_free ? <Pill tone="free">Free</Pill> : null}
              {product.is_trending ? <Pill tone="trending">🔥 Trending</Pill> : null}
            </div>

            <h3 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
              {product.short_description}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button variant="soft" size="xl" onClick={() => openPreview(product)}>
                <Eye aria-hidden />
                {PREVIEW_LABEL}
              </Button>
              <Button variant="grab" size="xl" onClick={() => openGrab(product)}>
                <Gift aria-hidden />
                {GRAB_LABEL}
              </Button>
            </div>

            <Link
              to="/project/$slug"
              params={{ slug: product.slug }}
              className="focus-ring mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              See full details
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

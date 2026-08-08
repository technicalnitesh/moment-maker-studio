import { Link } from "@tanstack/react-router";
import { Eye, Gift, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/common/Pill";
import { GRAB_LABEL, PREVIEW_LABEL } from "@/config/site";
import type { Product } from "@/data/types";
import { categoryEmoji, categoryName } from "@/lib/catalog";
import { useProductActions } from "@/components/product/ProductActionsProvider";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  eager = false,
}: {
  product: Product;
  className?: string | undefined;
  eager?: boolean;
}) {
  const { openPreview, openGrab, openShare } = useProductActions();

  return (
    <article
      className={cn(
        "card-surface group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-gradient-brand pointer-events-none absolute inset-x-8 -top-16 h-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
      />

      <Link
        to="/project/$slug"
        params={{ slug: product.slug }}
        className="focus-ring relative block overflow-hidden"
        aria-label={`Open ${product.name}`}
      >
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={product.thumbnail_url}
            alt={`${product.name} — ${categoryName(product.category)} digital experience preview`}
            width={1200}
            height={800}
            loading={eager ? "eager" : "lazy"}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.is_free ? <Pill tone="free">Free</Pill> : null}
          {product.is_trending ? <Pill tone="trending">🔥 Trending</Pill> : null}
          {product.is_new ? <Pill tone="new">New</Pill> : null}
        </div>
      </Link>

      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Pill tone="category">
            {categoryEmoji(product.category)} {categoryName(product.category)}
          </Pill>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            {product.social_tag}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug">
          <Link
            to="/project/$slug"
            params={{ slug: product.slug }}
            className="focus-ring transition-colors duration-200 hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.short_description}
        </p>

        <div className="mt-4 flex items-center gap-2 pt-1">
          <Button
            variant="soft"
            size="pill"
            className="flex-1"
            onClick={() => openPreview(product)}
          >
            <Eye aria-hidden />
            {PREVIEW_LABEL}
          </Button>
          <Button variant="grab" size="pill" className="flex-1" onClick={() => openGrab(product)}>
            <Gift aria-hidden />
            Grab
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full"
            aria-label={`Share ${product.name}`}
            onClick={() => openShare(product)}
          >
            <Share2 aria-hidden />
          </Button>
        </div>
        <span className="sr-only">{GRAB_LABEL}</span>
      </div>
    </article>
  );
}

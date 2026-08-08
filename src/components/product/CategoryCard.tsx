import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/types";
import { countByCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const gradientClass = {
  brand: "bg-gradient-brand",
  warm: "bg-gradient-warm",
  cool: "bg-gradient-cool",
} as const;

export function CategoryCard({
  category,
  className,
}: {
  category: Category;
  className?: string | undefined;
}) {
  const count = countByCategory(category.slug);

  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className={cn(
        "card-surface group relative block overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-55",
          gradientClass[category.gradient],
        )}
      />
      <span className="relative block text-2xl">{category.emoji}</span>
      <h3 className="relative mt-3 text-base font-semibold">{category.name}</h3>
      <p className="relative mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {category.description}
      </p>
      <p className="relative mt-3 text-[11px] font-bold uppercase tracking-wider text-primary">
        {count} {count === 1 ? "project" : "projects"}
      </p>
    </Link>
  );
}

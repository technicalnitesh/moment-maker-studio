import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/common/Reveal";
import { EmptyState } from "@/components/common/States";
import { ProductGridSkeleton } from "@/components/common/Skeletons";
import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  isLoading = false,
  columns = 3,
  emptyTitle = "No surprises match that yet",
  emptyDescription = "Try a different occasion or clear your filters.",
  className,
}: {
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string | undefined;
}) {
  if (isLoading) return <ProductGridSkeleton count={columns * 2} />;

  if (!products.length) {
    return (
      <EmptyState
        icon="✨"
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Browse all projects"
        actionTo="/projects"
      />
    );
  }

  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-5", cols, className)}>
      {products.map((product, i) => (
        <Reveal key={product.id} delay={Math.min(i, 6) * 70}>
          <ProductCard product={product} className="h-full" eager={i < 3} />
        </Reveal>
      ))}
    </div>
  );
}

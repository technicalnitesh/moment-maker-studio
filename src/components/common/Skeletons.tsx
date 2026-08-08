import { cn } from "@/lib/utils";

function Block({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-xl bg-surface-2/70", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden rounded-3xl p-4">
      <Block className="aspect-[3/2] w-full rounded-2xl" />
      <div className="mt-4 space-y-3">
        <Block className="h-3 w-24" />
        <Block className="h-5 w-3/4" />
        <Block className="h-3 w-full" />
        <Block className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Block className="h-10 flex-1 rounded-full" />
          <Block className="h-10 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <Block className="aspect-[3/2] w-full rounded-3xl" />
      <div className="space-y-4">
        <Block className="h-3 w-28" />
        <Block className="h-9 w-4/5" />
        <Block className="h-3 w-full" />
        <Block className="h-3 w-3/4" />
        <Block className="h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Block key={i} className="h-36 rounded-3xl" />
      ))}
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Block className="size-14 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Block className="h-3 w-2/5" />
            <Block className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

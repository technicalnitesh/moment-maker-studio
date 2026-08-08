import { categories, products } from "@/data/products";
import type {
  Category,
  CategorySlug,
  Product,
  ProductFilterKey,
  ProductQuery,
} from "@/data/types";

/**
 * Data/service layer.
 *
 * Today this reads from local mock JSON. Every function is async and shaped
 * like a REST response, so swapping in real endpoints later
 * (GET /api/products, GET /api/products/{slug}, GET /api/categories)
 * requires no UI changes.
 */

const published = (p: Product) => p.status === "published";

function matchesSearch(product: Product, term: string) {
  const q = term.trim().toLowerCase();
  if (!q) return true;
  return [
    product.name,
    product.category,
    product.occasion,
    product.short_description,
    product.description,
    ...product.tags,
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function matchesFilters(product: Product, filters: ProductFilterKey[]) {
  if (!filters.length) return true;
  return filters.every((f) => {
    switch (f) {
      case "all":
        return true;
      case "trending":
        return product.is_trending;
      case "new":
        return product.is_new;
      case "free":
        return product.is_free;
      default:
        return product.category === f;
    }
  });
}

const bySortOrder = (a: Product, b: Product) => a.sort_order - b.sort_order;

export async function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  const { search = "", category, filters = [] } = query;
  return products
    .filter(published)
    .filter((p) => (category ? p.category === category : true))
    .filter((p) => matchesSearch(p, search))
    .filter((p) => matchesFilters(p, filters))
    .sort(bySortOrder);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug && published(p)) ?? null;
}

export async function listCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function listFeatured(): Promise<Product[]> {
  return products.filter(published).filter((p) => p.is_featured).sort(bySortOrder);
}

export async function listTrending(limit?: number): Promise<Product[]> {
  const items = products.filter(published).filter((p) => p.is_trending).sort(bySortOrder);
  return limit ? items.slice(0, limit) : items;
}

export async function listNew(limit?: number): Promise<Product[]> {
  const items = products.filter(published).filter((p) => p.is_new).sort(bySortOrder);
  return limit ? items.slice(0, limit) : items;
}

export async function listRelated(product: Product, limit = 3): Promise<Product[]> {
  return products
    .filter(published)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort(bySortOrder)
    .slice(0, limit);
}

export function countByCategory(slug: CategorySlug) {
  return products.filter(published).filter((p) => p.category === slug).length;
}

export function categoryName(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function categoryEmoji(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)?.emoji ?? "✨";
}

/** Synchronous accessors for router loaders / SSR head generation. */
export const productsSync = () => products.filter(published).sort(bySortOrder);
export const productBySlugSync = (slug: string) =>
  products.find((p) => p.slug === slug && published(p)) ?? null;
export const categoryBySlugSync = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? null;

export const productKeys = {
  all: ["products"] as const,
  list: (query: ProductQuery) => ["products", "list", query] as const,
  detail: (slug: string) => ["products", "detail", slug] as const,
  categories: ["categories"] as const,
};

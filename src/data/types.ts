export type ProductStatus = "published" | "draft" | "archived";

export type CategorySlug =
  | "birthday"
  | "anniversary"
  | "love"
  | "proposal"
  | "memories"
  | "celebration"
  | "friendship"
  | "special-moments";

export interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  category: CategorySlug;
  occasion: string;
  thumbnail_url: string;
  preview_url: string;
  download_url: string;
  grab_code: string;
  social_tag: string;
  features: string[];
  perfect_for: string[];
  tags: string[];
  is_free: boolean;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  status: ProductStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  emoji: string;
  description: string;
  gradient: "brand" | "warm" | "cool";
}

export type ProductFilterKey =
  | CategorySlug
  | "trending"
  | "new"
  | "free"
  | "all";

export interface ProductQuery {
  search?: string;
  category?: CategorySlug;
  filters?: ProductFilterKey[];
}

import { blogPosts, blogCategories } from "@/data/blog";
import { BlogPost, BlogCategory } from "@/blog/types/blog";

/**
 * Blog Service Layer.
 * Designed to be swapped with real API calls later.
 */

export const getPosts = async (filters?: { category?: string; tag?: string }): Promise<BlogPost[]> => {
  let posts = blogPosts;
  if (filters?.category) {
    posts = posts.filter((p) => p.category === filters.category);
  }
  if (filters?.tag) {
    posts = posts.filter((p) => p.tags.includes(filters.tag!));
  }
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  return blogPosts.find((p) => p.slug === slug) ?? null;
};

export const getCategories = async (): Promise<BlogCategory[]> => {
  return blogCategories;
};

export const getCategoryBySlug = async (slug: string): Promise<BlogCategory | null> => {
  return blogCategories.find((c) => c.slug === slug) ?? null;
};

export const searchPosts = async (term: string): Promise<BlogPost[]> => {
  const q = term.toLowerCase();
  return blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
};

export const getRelatedPosts = async (post: BlogPost, limit = 3): Promise<BlogPost[]> => {
  return blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
};

export const getLatestPosts = async (limit = 3): Promise<BlogPost[]> => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
};

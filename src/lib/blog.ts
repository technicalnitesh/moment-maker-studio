import { BlogPost, BlogCategory } from "@/blog/types/blog";

/**
 * Blog Service Layer.
 * Communicates with the Cloudflare Worker API.
 * Designed to be migration-friendly by keeping the UI agnostic to the backend.
 */

const API_BASE = "/api/blog";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`\${API_BASE}\${path}`, options);
  const result: ApiResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || "API Error");
  }
  
  return result.data;
}

export const getPosts = async (filters?: { category?: string; tag?: string; page?: number; limit?: number }): Promise<BlogPost[]> => {
  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.tag) params.append("tag", filters.tag);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());
  
  const queryString = params.toString() ? `?\${params.toString()}` : "";
  
  try {
    const rawPosts = await fetchApi<any[]>(`/posts\${queryString}`);
    return rawPosts.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const rawPost = await fetchApi<any>(`/posts/\${slug}`);
    return mapApiPostToModel(rawPost);
  } catch (error) {
    console.error(`Error fetching post \${slug}:`, error);
    return null;
  }
};

export const getCategories = async (): Promise<BlogCategory[]> => {
  try {
    return await fetchApi<BlogCategory[]>("/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const searchPosts = async (term: string): Promise<BlogPost[]> => {
  if (!term.trim()) return [];
  try {
    const rawPosts = await fetchApi<any[]>(`/search?q=\${encodeURIComponent(term)}`);
    return rawPosts.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
};

export const getLatestPosts = async (limit = 3): Promise<BlogPost[]> => {
  return getPosts({ limit });
};

// Helper to map DB record fields to the frontend model
function mapApiPostToModel(apiPost: any): BlogPost {
  return {
    id: apiPost.id,
    title: apiPost.title,
    slug: apiPost.slug,
    excerpt: apiPost.excerpt || "",
    content: apiPost.content,
    category: apiPost.category_name || "Uncategorized",
    tags: apiPost.tags ? apiPost.tags.map((t: any) => t.name) : [],
    author: {
      name: apiPost.author_name || "Anonymous",
      avatar: apiPost.author_avatar || ""
    },
    featuredImage: apiPost.featured_image_url || "/placeholder.svg",
    publishedAt: apiPost.published_at,
    readingTime: apiPost.reading_time || 5
  };
}


import { BlogPost, BlogCategory, BlogTag } from "@/blog/types/blog";

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
  const response = await fetch(`${API_BASE}${path}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `API Error: ${response.status}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || "API Error");
  }
  
  return result.data;
}

// --- Public Methods ---

export const getPosts = async (filters?: { category?: string; tag?: string; page?: number; limit?: number }): Promise<BlogPost[]> => {
  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.tag) params.append("tag", filters.tag);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());
  
  const queryString = params.toString() ? `?${params.toString()}` : "";
  
  try {
    const rawPosts = await fetchApi<any[]>(`/posts${queryString}`);
    return rawPosts.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const rawPost = await fetchApi<any>(`/posts/${slug}`);
    return mapApiPostToModel(rawPost);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
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

export const getTags = async (): Promise<BlogTag[]> => {
  try {
    return await fetchApi<BlogTag[]>("/tags");
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};

export const searchPosts = async (term: string): Promise<BlogPost[]> => {
  if (!term.trim()) return [];
  try {
    const rawPosts = await fetchApi<any[]>(`/search?q=${encodeURIComponent(term)}`);
    return rawPosts.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
};

export const getLatestPosts = async (limit = 3): Promise<BlogPost[]> => {
  return getPosts({ limit });
};

export const getCategoryBySlug = async (slug: string): Promise<BlogCategory | null> => {
  try {
    return await fetchApi<BlogCategory | null>(`/categories/${slug}`);
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
};

export const getTagBySlug = async (slug: string): Promise<any | null> => {
  try {
    return await fetchApi<any | null>(`/tags/${slug}`);
  } catch (error) {
    console.error(`Error fetching tag ${slug}:`, error);
    return null;
  }
};

// --- Admin Methods ---

export const getAdminPosts = async (filters?: { status?: string; search?: string; page?: number; limit?: number }): Promise<BlogPost[]> => {
  const params = new URLSearchParams();
  params.append("admin", "true");
  if (filters?.status && filters.status !== 'all') params.append("status", filters.status);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());
  
  try {
    const rawPosts = await fetchApi<any[]>(`/posts?${params.toString()}`);
    return rawPosts.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    return [];
  }
};

export const getPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const rawPost = await fetchApi<any>(`/posts/id/${id}`);
    return mapApiPostToModel(rawPost);
  } catch (error) {
    console.error(`Error fetching post by ID ${id}:`, error);
    return null;
  }
};

export const createPost = async (postData: Partial<BlogPost>): Promise<BlogPost> => {
  const data = await fetchApi<any>("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapModelToApiPost(postData))
  });
  return mapApiPostToModel(data);
};

export const updatePost = async (id: string, postData: Partial<BlogPost>): Promise<BlogPost> => {
  const data = await fetchApi<any>(`/posts/id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapModelToApiPost(postData))
  });
  return mapApiPostToModel(data);
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/posts/id/${id}`, {
      method: "DELETE"
    });
    return true;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    return false;
  }
};

// --- Category Admin ---
export const createCategory = async (data: Partial<BlogCategory>): Promise<BlogCategory> => {
  return await fetchApi<BlogCategory>("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const updateCategory = async (slug: string, data: Partial<BlogCategory>): Promise<BlogCategory> => {
  return await fetchApi<BlogCategory>(`/categories/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const deleteCategory = async (slug: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/categories/${slug}`, { method: "DELETE" });
    return true;
  } catch (error) {
    return false;
  }
};

// --- Tag Admin ---
export const createTag = async (data: Partial<BlogTag>): Promise<BlogTag> => {
  return await fetchApi<BlogTag>("/tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const updateTag = async (slug: string, data: Partial<BlogTag>): Promise<BlogTag> => {
  return await fetchApi<BlogTag>(`/tags/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const deleteTag = async (slug: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/tags/${slug}`, { method: "DELETE" });
    return true;
  } catch (error) {
    return false;
  }
};

// --- Media Admin ---

export interface BlogMedia {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  file_size: number;
  width?: number;
  height?: number;
  storage_provider: string;
  storage_key: string;
  url: string;
  alt_text?: string;
  created_at: string;
  updated_at: string;
}

export const getMedia = async (): Promise<BlogMedia[]> => {
  return await fetchApi<BlogMedia[]>("/admin/media");
};

export const uploadMedia = async (file: File, altText?: string): Promise<BlogMedia> => {
  const formData = new FormData();
  formData.append("file", file);
  if (altText) formData.append("altText", altText);

  return await fetchApi<BlogMedia>("/admin/media", {
    method: "POST",
    body: formData
  });
};

export const deleteMedia = async (id: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/admin/media/id/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateMediaAlt = async (id: string, altText: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/admin/media/id/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt_text: altText })
    });
    return true;
  } catch (error) {
    return false;
  }
};

// --- Author Admin ---
export const getAuthors = async (): Promise<any[]> => {
  return await fetchApi<any[]>("/authors");
};

export const createAuthor = async (data: any): Promise<any> => {
  return await fetchApi<any>("/authors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const updateAuthor = async (id: string, data: any): Promise<boolean> => {
  try {
    await fetchApi<void>(`/authors/id/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAuthor = async (id: string): Promise<boolean> => {
  try {
    await fetchApi<void>(`/authors/id/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    throw error;
  }
};

// --- Helpers ---

function mapApiPostToModel(apiPost: any): BlogPost {
  return {
    id: apiPost.id,
    title: apiPost.title,
    slug: apiPost.slug,
    excerpt: apiPost.excerpt || "",
    content: apiPost.content,
    category: apiPost.category_name || "Uncategorized",
    categoryId: apiPost.category_id,
    tags: apiPost.tags ? apiPost.tags.map((t: any) => t.name) : [],
    author: {
      id: apiPost.author_id,
      name: apiPost.author_name || "Anonymous",
      avatar: apiPost.author_avatar || ""
    },
    featuredImage: apiPost.featured_image_url || apiPost.featured_image || "/placeholder.svg",
    featuredImageId: apiPost.featured_image_id || apiPost.featured_image,

    status: apiPost.status || 'published',
    publishedAt: apiPost.published_at,
    updatedAt: apiPost.updated_at || apiPost.published_at,
    readingTime: apiPost.reading_time || 5,
    seoTitle: apiPost.seo_title,
    seoDescription: apiPost.seo_description,
    canonicalUrl: apiPost.canonical_url
  };
}

function mapModelToApiPost(model: Partial<BlogPost>): any {
  return {
    title: model.title,
    slug: model.slug,
    excerpt: model.excerpt,
    content: model.content,
    category_id: model.categoryId || model.category, // Handle both
    author_id: model.author?.id,
    featured_image_id: model.featuredImageId || (model as any).featured_image_id,
    status: model.status,
    published_at: model.publishedAt,
    reading_time: model.readingTime,
    seo_title: model.seoTitle,
    seo_description: model.seoDescription,
    canonical_url: model.canonicalUrl,
    tags: model.tags
  };
}

export const getRelatedPosts = async (post: BlogPost, limit = 3): Promise<BlogPost[]> => {
  try {
    const rawPostData = await fetchApi<any>(`/posts/${post.slug}`);
    const data = rawPostData.related || [];
    return data.map(mapApiPostToModel);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};

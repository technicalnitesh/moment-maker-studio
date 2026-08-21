export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryId?: string;
  tags: string[];
  author: {
    id?: string;
    name: string;
    avatar?: string;
  };
  featuredImage: string;
  featuredImageId?: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface BlogCategory {
  id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogTag {
  id?: string;
  name: string;
  slug: string;
}

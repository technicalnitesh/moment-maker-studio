export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  isFeatured?: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface BlogTag {
  name: string;
  slug: string;
}

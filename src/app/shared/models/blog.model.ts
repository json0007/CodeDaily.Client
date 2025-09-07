export interface Blog {
  id: string;
  title: string;
  description: string;
  publishedDate: Date;
  content: string;
  tags: string[];
  slug: string;
  isFeatured: boolean;
  readTime?: number; // optional, in minutes
  author?: string; // optional, for future use
}

export interface BlogListItem {
  id: string;
  title: string;
  description: string;
  publishedDate: Date;
  tags: string[];
  slug: string;
  isFeatured: boolean;
  readTime?: number; // optional, in minutes
}
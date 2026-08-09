export interface Author {
  name: string;
  bio: string | null;
  photoUrl: string | null;
  credentials: string[] | null;

}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  publishedAt: string;
  thumbnailUrl: string | null;
  arm: string;
  type: string;
  sourceUrl?: string | null;
  question_slug?: string | null;
  author?: Author | null;
}

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  arm: string;
  type: string;
  status: 'draft' | 'published';
  published_at: string | null;
  author_id: string | null;
  source_url: string | null;
  question_slug: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

import { createClient, createReadOnlyClient } from '@/lib/supabase/server';
import { Post, AdminPost } from '@/types/post';

/**
 * Fetches a list of published posts with pagination and optional filters.
 */
export async function getPosts({
  page = 1,
  limit = 9,
  arm,
  type,
}: {
  page?: number;
  limit?: number;
  arm?: string;
  type?: string;
}) {
  const supabase = createReadOnlyClient();

  let query = supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, cover_image_url, arm, type', { count: 'exact' })
    .eq('status', 'published');

  if (arm) {
    query = query.eq('arm', arm);
  }

  if (type) {
    query = query.eq('type', type);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }

  const formattedPosts: Post[] =
    data?.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.published_at,
      thumbnailUrl: post.cover_image_url,
      arm: post.arm,
      type: post.type,
    })) || [];

  return { posts: formattedPosts, total: count || 0 };
}

/**
 * Fetches a single published post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createReadOnlyClient();

  const { data, error } = await supabase
    .from('posts')
    .select(`
      title, slug, excerpt, body, published_at, cover_image_url, arm, type, source_url,
      authors ( name, bio, photo_url, credentials )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;

  const rawAuthor = Array.isArray(data.authors) ? data.authors[0] : data.authors;
  const author = rawAuthor
    ? {
        name: rawAuthor.name,
        bio: rawAuthor.bio,
        photoUrl: rawAuthor.photo_url,
        credentials: rawAuthor.credentials,
      }
    : null;

  return {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    body: data.body,
    publishedAt: data.published_at,
    thumbnailUrl: data.cover_image_url,
    arm: data.arm,
    type: data.type,
    sourceUrl: data.source_url,
    author,
  };
}

/**
 * Fetches related published posts excluding the current one.
 */
export async function getRelatedPosts(currentSlug: string, arm?: string, limit = 3): Promise<Post[]> {
  const supabase = createReadOnlyClient();

  let query = supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, cover_image_url, arm, type')
    .eq('status', 'published')
    .neq('slug', currentSlug);

  if (arm) {
    query = query.eq('arm', arm);
  }

  const { data } = await query.order('published_at', { ascending: false }).limit(limit);

  return (
    data?.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.published_at,
      thumbnailUrl: post.cover_image_url,
      arm: post.arm,
      type: post.type,
    })) || []
  );
}

/**
 * Fetches all slugs of published posts for static generation.
 */
export async function getAllPostSlugs(): Promise<{ slug: string; published_at: string }[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }

  return data || [];
}

/**
 * Fetches the count of posts with a specific status.
 */
export async function getPostsCount(status?: 'draft' | 'published'): Promise<number> {
  const supabase = await createClient();
  let query = supabase.from('posts').select('*', { count: 'exact', head: true });
  if (status) {
    query = query.eq('status', status);
  }
  const { count, error } = await query;
  if (error) {
    console.error('Error fetching posts count:', error);
    return 0;
  }
  return count || 0;
}

/**
 * Fetches all posts for the admin table with an optional filter.
 */
export async function getAdminPosts({
  filter,
  page = 1,
  limit = 20,
}: {
  filter?: string;
  page?: number;
  limit?: number;
} = {}) {
  const supabase = await createClient();
  let query = supabase
    .from('posts')
    .select('id, title, arm, type, status, published_at', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (filter === 'draft') {
    query = query.eq('status', 'draft');
  } else if (filter === 'published') {
    query = query.eq('status', 'published');
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query.range(from, to);
  if (error) {
    console.error('Error fetching admin posts:', error);
    return { posts: [], total: 0 };
  }
  return { posts: data || [], total: count || 0 };
}

/**
 * Fetches all authors sorted by name.
 */
export async function getAuthors(): Promise<{ id: string; name: string }[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('authors')
    .select('id, name')
    .order('name');

  if (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetches a single post by its ID for editing.
 */
export async function getAdminPostById(id: string): Promise<AdminPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching admin post by ID:', error);
    return null;
  }
  return data;
}

/**
 * Fetches a single post by slug regardless of status (for previews).
 */
export async function getAdminPostBySlug(slug: string): Promise<any> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      title, slug, excerpt, body, published_at, cover_image_url, arm, type, source_url, status,
      authors ( name, bio, photo_url )
    `)
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Error fetching admin post by slug:', error);
    return null;
  }
  return data;
}

/**
 * Fetches the primary author (first one in the DB) to display on static page banners.
 */
export async function getPrimaryAuthor(): Promise<any | null> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('authors')
    .select('name, bio, photo_url, credentials')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching primary author:', error);
    return null;
  }
  return data;
}

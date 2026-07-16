import { query } from '@/lib/mysql';
import { Post, AdminPost } from '@/types/post';

function parseAuthor(row: any) {
  if (!row) return null;
  let credentials = [];
  if (row.credentials) {
    try {
      credentials = typeof row.credentials === 'string' 
        ? JSON.parse(row.credentials) 
        : row.credentials;
    } catch {
      credentials = [];
    }
  }
  return {
    name: row.name,
    bio: row.bio || null,
    photoUrl: row.photo_url || null,
    credentials,
  };
}

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
  try {
    const offset = (page - 1) * limit;
    let sql = "SELECT title, slug, excerpt, published_at, cover_image_url, arm, type FROM posts WHERE status = 'published'";
    const params: any[] = [];

    if (arm) {
      sql += " AND arm = ?";
      params.push(arm);
    }

    if (type) {
      sql += " AND type = ?";
      params.push(type);
    }

    sql += " ORDER BY published_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const data = await query<any[]>(sql, params);

    // Get exact count
    let countSql = "SELECT COUNT(*) as count FROM posts WHERE status = 'published'";
    const countParams: any[] = [];
    if (arm) {
      countSql += " AND arm = ?";
      countParams.push(arm);
    }
    if (type) {
      countSql += " AND type = ?";
      countParams.push(type);
    }
    const countRows = await query<any[]>(countSql, countParams);
    const count = countRows[0]?.count || 0;

    const formattedPosts: Post[] = data.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      publishedAt: post.published_at ? new Date(post.published_at).toISOString() : '',
      thumbnailUrl: post.cover_image_url,
      arm: post.arm,
      type: post.type,
    }));

    return { posts: formattedPosts, total: count };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }
}

/**
 * Fetches a single published post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const sql = `
      SELECT p.*, a.name, a.bio, a.photo_url, a.credentials 
      FROM posts p 
      LEFT JOIN authors a ON p.author_id = a.id 
      WHERE p.slug = ? AND p.status = 'published' 
      LIMIT 1
    `;
    const rows = await query<any[]>(sql, [slug]);
    if (rows.length === 0) return null;

    const row = rows[0];
    const author = row.name ? parseAuthor(row) : null;

    return {
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      body: row.body || '',
      publishedAt: row.published_at ? new Date(row.published_at).toISOString() : '',
      thumbnailUrl: row.cover_image_url,
      arm: row.arm,
      type: row.type,
      sourceUrl: row.source_url,
      author,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Fetches related published posts excluding the current one.
 */
export async function getRelatedPosts(currentSlug: string, arm?: string, limit = 3): Promise<Post[]> {
  try {
    let sql = "SELECT title, slug, excerpt, published_at, cover_image_url, arm, type FROM posts WHERE status = 'published' AND slug != ?";
    const params: any[] = [currentSlug];

    if (arm) {
      sql += " AND arm = ?";
      params.push(arm);
    }

    sql += " ORDER BY published_at DESC LIMIT ?";
    params.push(limit);

    const data = await query<any[]>(sql, params);

    return data.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      publishedAt: post.published_at ? new Date(post.published_at).toISOString() : '',
      thumbnailUrl: post.cover_image_url,
      arm: post.arm,
      type: post.type,
    }));
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

/**
 * Fetches all slugs of published posts for static generation.
 */
export async function getAllPostSlugs(): Promise<{ slug: string; published_at: string }[]> {
  try {
    const rows = await query<any[]>("SELECT slug, published_at FROM posts WHERE status = 'published' ORDER BY published_at DESC");
    return rows.map(r => ({
      slug: r.slug,
      published_at: r.published_at ? new Date(r.published_at).toISOString() : '',
    }));
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Fetches the count of posts with a specific status.
 */
export async function getPostsCount(status?: 'draft' | 'published'): Promise<number> {
  try {
    let sql = "SELECT COUNT(*) as count FROM posts";
    const params: any[] = [];
    if (status) {
      sql += " WHERE status = ?";
      params.push(status);
    }
    const rows = await query<any[]>(sql, params);
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching posts count:', error);
    return 0;
  }
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
  try {
    const offset = (page - 1) * limit;
    let sql = "SELECT id, title, arm, type, status, published_at FROM posts";
    const params: any[] = [];

    if (filter === 'draft') {
      sql += " WHERE status = 'draft'";
    } else if (filter === 'published') {
      sql += " WHERE status = 'published'";
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const data = await query<any[]>(sql, params);

    // Get exact count
    let countSql = "SELECT COUNT(*) as count FROM posts";
    const countParams: any[] = [];
    if (filter === 'draft') {
      countSql += " WHERE status = 'draft'";
    } else if (filter === 'published') {
      countSql += " WHERE status = 'published'";
    }
    const countRows = await query<any[]>(countSql, countParams);
    const count = countRows[0]?.count || 0;

    return { posts: data, total: count };
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return { posts: [], total: 0 };
  }
}

/**
 * Fetches all authors sorted by name.
 */
export async function getAuthors(): Promise<{ id: string; name: string }[]> {
  try {
    const rows = await query<any[]>("SELECT id, name FROM authors ORDER BY name ASC");
    return rows;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

/**
 * Fetches a single post by its ID for editing.
 */
export async function getAdminPostById(id: string): Promise<AdminPost | null> {
  try {
    const rows = await query<any[]>("SELECT * FROM posts WHERE id = ? LIMIT 1", [id]);
    if (rows.length === 0) return null;
    return rows[0] as AdminPost;
  } catch (error) {
    console.error('Error fetching admin post by ID:', error);
    return null;
  }
}

/**
 * Fetches a single post by slug regardless of status (for previews).
 */
export async function getAdminPostBySlug(slug: string): Promise<any> {
  try {
    const sql = `
      SELECT p.*, a.name, a.bio, a.photo_url 
      FROM posts p 
      LEFT JOIN authors a ON p.author_id = a.id 
      WHERE p.slug = ? 
      LIMIT 1
    `;
    const rows = await query<any[]>(sql, [slug]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    const author = row.name ? {
      name: row.name,
      bio: row.bio || null,
      photoUrl: row.photo_url || null,
    } : null;

    return {
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      body: row.body || '',
      published_at: row.published_at ? new Date(row.published_at).toISOString() : null,
      cover_image_url: row.cover_image_url,
      arm: row.arm,
      type: row.type,
      source_url: row.source_url,
      status: row.status,
      authors: author,
    };
  } catch (error) {
    console.error('Error fetching admin post by slug:', error);
    return null;
  }
}

/**
 * Fetches the primary author (first one in the DB) to display on static page banners.
 */
export async function getPrimaryAuthor(): Promise<any | null> {
  try {
    const rows = await query<any[]>("SELECT name, bio, photo_url, credentials FROM authors LIMIT 1");
    if (rows.length === 0) return null;
    
    const row = rows[0];
    let credentials = [];
    if (row.credentials) {
      try {
        credentials = typeof row.credentials === 'string' 
          ? JSON.parse(row.credentials) 
          : row.credentials;
      } catch {
        credentials = [];
      }
    }

    return {
      name: row.name,
      bio: row.bio,
      photo_url: row.photo_url,
      credentials,
    };
  } catch (error) {
    console.error('Error fetching primary author:', error);
    return null;
  }
}

/**
 * Fetches the count of posts published in the last 7 days.
 */
export async function getRecentPublicationsCount(): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const rows = await query<any[]>(
      "SELECT COUNT(*) as count FROM posts WHERE status = 'published' AND published_at >= ?",
      [sevenDaysAgo]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching recent publications count:', error);
    return 0;
  }
}

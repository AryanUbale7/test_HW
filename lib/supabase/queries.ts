import { createClient } from '@/lib/supabase/server'

export async function getPosts({ page = 1, limit = 9, arm, type }: { page?: number, limit?: number, arm?: string, type?: string }) {
  const supabase = await createClient()
  
  let query = supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, cover_image_url, arm, type', { count: 'exact' })
    .eq('status', 'published')

  if (arm) {
    query = query.eq('arm', arm)
  }
  
  if (type) {
    query = query.eq('type', type)
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, count, error } = await query
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], total: 0 }
  }

  const formattedPosts = data?.map(post => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.published_at,
    thumbnailUrl: post.cover_image_url,
    arm: post.arm,
    type: post.type
  })) || []

  return { posts: formattedPosts, total: count || 0 }
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      title, slug, excerpt, body, published_at, cover_image_url, arm, type, source_url,
      authors ( name, bio, photo_url, credentials )
    `)
    .eq('slug', slug)
    .single()
    
  if (error || !data) return null

  const rawAuthor = Array.isArray(data.authors) ? data.authors[0] : data.authors
  const author = rawAuthor ? {
    name: rawAuthor.name,
    bio: rawAuthor.bio,
    photoUrl: rawAuthor.photo_url,
    credentials: rawAuthor.credentials,
  } : null
  
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
  }
}

export async function getRelatedPosts(currentSlug: string, arm?: string, limit = 3) {
  const supabase = await createClient()
  
  let query = supabase
    .from('posts')
    .select('title, slug, excerpt, published_at, cover_image_url, arm, type')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    
  if (arm) {
    query = query.eq('arm', arm)
  }
  
  const { data } = await query
    .order('published_at', { ascending: false })
    .limit(limit)
    
  return data?.map(post => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.published_at,
    thumbnailUrl: post.cover_image_url,
    arm: post.arm,
    type: post.type
  })) || []
}

export async function getResources() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, file_url, gated_by_email')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching resources:', error)
    return []
  }

  return data?.map(r => ({
    _id: r.id,
    title: r.title,
    description: r.description,
    fileUrl: r.file_url,
    gatedByEmail: r.gated_by_email
  })) || []
}

export async function getFaqs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, arm')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }

  return data?.map(f => ({
    _id: f.id,
    question: f.question,
    answer: f.answer,
    arm: f.arm
  })) || []
}

export async function getAllPostSlugs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }

  return data || []
}

// =====================
// Glossary queries
// =====================

export type GlossaryTerm = {
  id: string
  term: string
  slug: string
  short_definition: string
  full_explanation: string | null
  arm: string | null
  related_term_slugs: string[]
  created_at: string
  updated_at: string
}

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term', { ascending: true })

  if (error) {
    console.error('Error fetching glossary terms:', error)
    return []
  }
  return data || []
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

export async function getAllGlossarySlugs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('slug, updated_at')
    .order('term', { ascending: true })

  if (error) {
    console.error('Error fetching glossary slugs:', error)
    return []
  }
  return data || []
}

'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function createPost(prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const body = formData.get('body') as string
  const cover_image_url = formData.get('cover_image_url') as string
  const arm = formData.get('arm') as string
  const type = formData.get('type') as string
  const source_url = formData.get('source_url') as string
  const author_id = formData.get('author_id') as string
  const seo_title = formData.get('seo_title') as string
  const seo_description = formData.get('seo_description') as string
  const status = formData.get('status') as string

  // Validation
  const errors: Record<string, string> = {}
  if (!title?.trim()) errors.title = 'Title is required'
  if (!slug?.trim()) errors.slug = 'Slug is required'
  if (!arm) errors.arm = 'Please select an arm'
  if (!type) errors.type = 'Please select a type'

  if (status === 'published') {
    if (!excerpt?.trim()) errors.excerpt = 'Excerpt is required to publish'
    if (!body?.trim()) errors.body = 'Body content is required to publish'
    if (type === 'News' && !source_url?.trim()) errors.source_url = 'Source URL is required for News posts'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false }
  }

  const postData: any = {
    title: title.trim(),
    slug: slug.trim(),
    excerpt: excerpt?.trim() || null,
    body: body?.trim() || null,
    cover_image_url: cover_image_url || null,
    arm,
    type,
    source_url: source_url?.trim() || null,
    author_id: author_id || null,
    seo_title: seo_title?.trim() || null,
    seo_description: seo_description?.trim() || null,
    status: status || 'draft',
  }

  // Auto-set published_at when publishing for the first time
  if (status === 'published') {
    postData.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select('id')
    .single()

  if (error) {
    if (error.code === '23505' && error.message.includes('slug')) {
      return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false }
    }
    return { errors: { _form: `Failed to create post: ${error.message}` }, success: false }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
  redirect(`/admin/posts/${data.id}/edit`)
}

export async function updatePost(postId: string, prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const body = formData.get('body') as string
  const cover_image_url = formData.get('cover_image_url') as string
  const arm = formData.get('arm') as string
  const type = formData.get('type') as string
  const source_url = formData.get('source_url') as string
  const author_id = formData.get('author_id') as string
  const seo_title = formData.get('seo_title') as string
  const seo_description = formData.get('seo_description') as string
  const status = formData.get('status') as string

  // Validation
  const errors: Record<string, string> = {}
  if (!title?.trim()) errors.title = 'Title is required'
  if (!slug?.trim()) errors.slug = 'Slug is required'
  if (!arm) errors.arm = 'Please select an arm'
  if (!type) errors.type = 'Please select a type'

  if (status === 'published') {
    if (!excerpt?.trim()) errors.excerpt = 'Excerpt is required to publish'
    if (!body?.trim()) errors.body = 'Body content is required to publish'
    if (type === 'News' && !source_url?.trim()) errors.source_url = 'Source URL is required for News posts'
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false }
  }

  // Get current post to check if we need to set published_at
  const { data: existing } = await supabase
    .from('posts')
    .select('published_at, status')
    .eq('id', postId)
    .single()

  const postData: any = {
    title: title.trim(),
    slug: slug.trim(),
    excerpt: excerpt?.trim() || null,
    body: body?.trim() || null,
    cover_image_url: cover_image_url || null,
    arm,
    type,
    source_url: source_url?.trim() || null,
    author_id: author_id || null,
    seo_title: seo_title?.trim() || null,
    seo_description: seo_description?.trim() || null,
    status: status || 'draft',
  }

  // Auto-set published_at on first publish
  if (status === 'published' && (!existing?.published_at || existing?.status !== 'published')) {
    postData.published_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', postId)

  if (error) {
    if (error.code === '23505' && error.message.includes('slug')) {
      return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false }
    }
    return { errors: { _form: `Failed to update post: ${error.message}` }, success: false }
  }

  revalidatePath('/admin/posts')
  revalidatePath(`/articles/${slug}`)
  revalidatePath('/')
  return { errors: {}, success: true }
}

export async function deletePost(postId: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/')
  redirect('/admin/posts')
}

export async function uploadImage(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File

  if (!file || file.size === 0) {
    return { error: 'No file provided' }
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size must be under 5MB' }
  }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
  const filePath = `posts/${fileName}`

  const { error } = await supabase.storage
    .from('media')
    .upload(filePath, file)

  if (error) {
    return { error: `Upload failed: ${error.message}` }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath)

  return { url: publicUrl }
}

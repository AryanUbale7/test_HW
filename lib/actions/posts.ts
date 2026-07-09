'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/supabase/auth-check'
import { validatePost } from '@/lib/validations/post'
import { sanitizeRichText } from '@/lib/utils/sanitize'
import { validateUploadedFile } from '@/lib/utils/magicBytes'
import { writeAuditLog } from '@/lib/supabase/audit'

export async function createPost(prevState: any, formData: FormData): Promise<{ errors: Record<string, string>; success: boolean }> {
  try {
    const adminUser = await verifyAdminSession()

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

    // 1. Zod and custom validation
    const errors = validatePost({
      title,
      slug,
      excerpt,
      body,
      cover_image_url,
      arm: arm as any,
      type: type as any,
      source_url,
      author_id,
      seo_title,
      seo_description,
      status: status as any,
    })

    if (Object.keys(errors).length > 0) {
      return { errors, success: false }
    }

    // 2. Sanitize HTML body (stored from Tiptap rich-text editor)
    const sanitizedBody = body ? sanitizeRichText(body) : null

    const postData: any = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt?.trim() || null,
      body: sanitizedBody,
      cover_image_url: cover_image_url || null,
      arm,
      type,
      source_url: source_url?.trim() || null,
      author_id: author_id || null,
      seo_title: seo_title?.trim() || null,
      seo_description: seo_description?.trim() || null,
      status: status || 'draft',
    }

    if (status === 'published') {
      postData.published_at = new Date().toISOString()
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select('id')
      .single()

    if (error) {
      console.error('Post creation error:', error.message)
      if (error.code === '23505' && error.message.includes('slug')) {
        return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false }
      }
      return { errors: { _form: 'Database operation failed. Please try again.' }, success: false }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_POST',
      targetId: data.id,
      details: { title },
    })

    revalidatePath('/admin/posts')
    revalidatePath('/')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error in createPost action:', err)
    return { errors: { _form: err.message || 'An unexpected error occurred.' }, success: false }
  }

  // Redirect after success
  redirect('/admin/posts')
}

export async function updatePost(postId: string, prevState: any, formData: FormData): Promise<{ errors: Record<string, string>; success: boolean }> {
  try {
    const adminUser = await verifyAdminSession()

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

    // 1. Zod and custom validation
    const errors = validatePost({
      title,
      slug,
      excerpt,
      body,
      cover_image_url,
      arm: arm as any,
      type: type as any,
      source_url,
      author_id,
      seo_title,
      seo_description,
      status: status as any,
    })

    if (Object.keys(errors).length > 0) {
      return { errors, success: false }
    }

    const supabase = await createAdminClient()

    // Get current post to check if we need to set published_at
    const { data: existing, error: fetchErr } = await supabase
      .from('posts')
      .select('published_at, status')
      .eq('id', postId)
      .single()

    if (fetchErr) {
      console.error('Failed to fetch existing post:', fetchErr.message)
      return { errors: { _form: 'Existing post not found.' }, success: false }
    }

    // 2. Sanitize HTML body (stored from Tiptap rich-text editor)
    const sanitizedBody = body ? sanitizeRichText(body) : null

    const postData: any = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt?.trim() || null,
      body: sanitizedBody,
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
      console.error('Post update error:', error.message)
      if (error.code === '23505' && error.message.includes('slug')) {
        return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false }
      }
      return { errors: { _form: 'Database operation failed. Please try again.' }, success: false }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_POST',
      targetId: postId,
      details: { title },
    })

    revalidatePath('/admin/posts')
    revalidatePath(`/articles/${slug}`)
    revalidatePath('/')
    return { errors: {}, success: true }
  } catch (err: any) {
    console.error('Error in updatePost action:', err)
    return { errors: { _form: err.message || 'An unexpected error occurred.' }, success: false }
  }
}

export async function deletePost(postId: string) {
  try {
    const adminUser = await verifyAdminSession()

    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) {
      console.error('Post deletion failed:', error.message)
      return { error: 'Database delete failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_POST',
      targetId: postId,
    })

    revalidatePath('/admin/posts')
    revalidatePath('/')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error in deletePost action:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/posts')
}

export async function uploadImage(formData: FormData) {
  try {
    await verifyAdminSession()

    const file = formData.get('file') as File
    if (!file || file.size === 0) {
      return { error: 'No file provided' }
    }

    // Magic-byte check and size checks (Images up to 5MB)
    const fileCheck = await validateUploadedFile(file, ['image'], 5 * 1024 * 1024)
    if (!fileCheck.isValid) {
      return { error: fileCheck.error }
    }

    const supabase = await createAdminClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    const filePath = `posts/${fileName}`

    const { error } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (error) {
      console.error('Image storage upload failed:', error.message)
      return { error: 'Upload failed. Please try again.' }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    return { url: publicUrl }
  } catch (err: any) {
    console.error('Error in uploadImage action:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

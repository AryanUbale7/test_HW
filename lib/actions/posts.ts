'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/supabase/auth-check';
import { validatePost } from '@/lib/validations/post';
import { sanitizeRichText } from '@/lib/utils/sanitize';
import { validateUploadedFile } from '@/lib/utils/magicBytes';
import { writeAuditLog } from '@/lib/supabase/audit';
import { query } from '@/lib/mysql';
import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export async function createPost(prevState: any, formData: FormData): Promise<{ errors: Record<string, string>; success: boolean }> {
  try {
    const adminUser = await verifyAdminSession();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const body = formData.get('body') as string;
    const cover_image_url = formData.get('cover_image_url') as string;
    const arm = formData.get('arm') as string;
    const type = formData.get('type') as string;
    const source_url = formData.get('source_url') as string;
    const author_id = formData.get('author_id') as string;
    const seo_title = formData.get('seo_title') as string;
    const seo_description = formData.get('seo_description') as string;
    const status = formData.get('status') as string;

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
    });

    if (Object.keys(errors).length > 0) {
      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'CREATE_POST',
        targetId: 'VALIDATION_FAILED',
        details: { errors, title },
      });
      return { errors, success: false };
    }

    // Check if slug is already taken
    const existing = await query<any[]>('SELECT id FROM posts WHERE slug = ? LIMIT 1', [slug.trim()]);
    if (existing.length > 0) {
      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'CREATE_POST',
        targetId: 'SLUG_TAKEN',
        details: { slug: slug.trim(), title },
      });
      return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false };
    }

    // 2. Sanitize HTML body
    const sanitizedBody = body ? sanitizeRichText(body) : null;

    const id = crypto.randomUUID();
    const published_at = status === 'published' ? new Date() : null;

    await query(
      `INSERT INTO posts (id, title, slug, excerpt, body, cover_image_url, arm, type, status, published_at, author_id, source_url, seo_title, seo_description) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title.trim(),
        slug.trim(),
        excerpt?.trim() || null,
        sanitizedBody,
        cover_image_url || null,
        arm,
        type,
        status || 'draft',
        published_at,
        author_id || null,
        source_url?.trim() || null,
        seo_title?.trim() || null,
        seo_description?.trim() || null
      ]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_POST',
      targetId: id,
      details: { title },
    });

    revalidatePath('/admin/posts');
    revalidatePath('/');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error in createPost action:', err);
    try {
      await writeAuditLog({
        adminEmail: 'error-catcher',
        action: 'CREATE_POST',
        targetId: 'DB_ERROR',
        details: { message: err.message, stack: err.stack },
      });
    } catch {}
    return { errors: { _form: err.message || 'An unexpected error occurred.' }, success: false };
  }

  // Redirect after success
  redirect('/admin/posts');
}

export async function updatePost(postId: string, prevState: any, formData: FormData): Promise<{ errors: Record<string, string>; success: boolean }> {
  try {
    const adminUser = await verifyAdminSession();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const body = formData.get('body') as string;
    const cover_image_url = formData.get('cover_image_url') as string;
    const arm = formData.get('arm') as string;
    const type = formData.get('type') as string;
    const source_url = formData.get('source_url') as string;
    const author_id = formData.get('author_id') as string;
    const seo_title = formData.get('seo_title') as string;
    const seo_description = formData.get('seo_description') as string;
    const status = formData.get('status') as string;

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
    });

    if (Object.keys(errors).length > 0) {
      return { errors, success: false };
    }

    // Check if slug is already taken by another post
    const existingSlug = await query<any[]>('SELECT id FROM posts WHERE slug = ? AND id != ? LIMIT 1', [slug.trim(), postId]);
    if (existingSlug.length > 0) {
      return { errors: { slug: 'This slug is already taken. Please choose another.' }, success: false };
    }

    // Get current post to check status
    const existing = await query<any[]>('SELECT published_at, status FROM posts WHERE id = ? LIMIT 1', [postId]);
    if (existing.length === 0) {
      return { errors: { _form: 'Existing post not found.' }, success: false };
    }

    const currentPost = existing[0];
    const sanitizedBody = body ? sanitizeRichText(body) : null;

    let published_at = currentPost.published_at;
    if (status === 'published' && (!currentPost.published_at || currentPost.status !== 'published')) {
      published_at = new Date();
    }

    await query(
      `UPDATE posts 
       SET title = ?, slug = ?, excerpt = ?, body = ?, cover_image_url = ?, arm = ?, type = ?, status = ?, published_at = ?, author_id = ?, source_url = ?, seo_title = ?, seo_description = ? 
       WHERE id = ?`,
      [
        title.trim(),
        slug.trim(),
        excerpt?.trim() || null,
        sanitizedBody,
        cover_image_url || null,
        arm,
        type,
        status || 'draft',
        published_at,
        author_id || null,
        source_url?.trim() || null,
        seo_title?.trim() || null,
        seo_description?.trim() || null,
        postId
      ]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_POST',
      targetId: postId,
      details: { title },
    });

    revalidatePath('/admin/posts');
    revalidatePath(`/articles/${slug}`);
    revalidatePath('/');
    return { errors: {}, success: true };
  } catch (err: any) {
    console.error('Error in updatePost action:', err);
    return { errors: { _form: err.message || 'An unexpected error occurred.' }, success: false };
  }
}

export async function deletePost(postId: string) {
  try {
    const adminUser = await verifyAdminSession();

    await query('DELETE FROM posts WHERE id = ?', [postId]);

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_POST',
      targetId: postId,
    });

    revalidatePath('/admin/posts');
    revalidatePath('/');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error in deletePost action:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/posts');
}

export async function uploadImage(formData: FormData) {
  try {
    await verifyAdminSession();

    const file = formData.get('file') as File;
    if (!file || file.size === 0) {
      return { error: 'No file provided' };
    }

    // Magic-byte check and size checks (Images up to 5MB)
    const fileCheck = await validateUploadedFile(file, ['image'], 5 * 1024 * 1024);
    if (!fileCheck.isValid) {
      return { error: fileCheck.error };
    }

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    return { url: `/uploads/${fileName}` };
  } catch (err: any) {
    console.error('Error in uploadImage action:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
}

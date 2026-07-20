'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/auth-check';
import { resourceSchema, faqSchema } from '@/lib/validations/admin';
import { validateUploadedFile } from '@/lib/utils/magicBytes';
import { writeAuditLog } from '@/lib/audit';
import { sanitizeRichText } from '@/lib/utils/sanitize';
import { query } from '@/lib/mysql';
import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

export async function createResource(prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file_url = formData.get('file_url') as string;
    const gated_by_email = formData.get('gated_by_email') === 'on';

    // Zod validation
    const validation = resourceSchema.safeParse({ title, description, file_url, gated_by_email });
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    const id = crypto.randomUUID();
    await query(
      'INSERT INTO resources (id, title, description, file_url, gated_by_email) VALUES (?, ?, ?, ?, ?)',
      [id, title.trim(), description?.trim() || null, file_url || null, gated_by_email ? 1 : 0]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_RESOURCE',
      targetId: id,
      details: { title },
    });

    revalidatePath('/admin/resources');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error creating resource:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/resources');
}

export async function updateResource(id: string, prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const file_url = formData.get('file_url') as string;
    const gated_by_email = formData.get('gated_by_email') === 'on';

    // Zod validation
    const validation = resourceSchema.safeParse({ title, description, file_url, gated_by_email });
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    await query(
      'UPDATE resources SET title = ?, description = ?, file_url = ?, gated_by_email = ? WHERE id = ?',
      [title.trim(), description?.trim() || null, file_url || null, gated_by_email ? 1 : 0, id]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_RESOURCE',
      targetId: id,
      details: { title },
    });

    revalidatePath('/admin/resources');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error updating resource:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/resources');
}

export async function deleteResource(id: string) {
  try {
    const adminUser = await verifyAdminSession();

    await query('DELETE FROM resources WHERE id = ?', [id]);

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_RESOURCE',
      targetId: id,
    });

    revalidatePath('/admin/resources');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error deleting resource:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/resources');
}

export async function uploadResourceFile(formData: FormData) {
  try {
    await verifyAdminSession();

    const file = formData.get('file') as File;
    if (!file || file.size === 0) return { error: 'No file provided' };

    // Magic-byte check and size checks (PDF up to 20MB)
    const fileCheck = await validateUploadedFile(file, ['pdf'], 20 * 1024 * 1024);
    if (!fileCheck.isValid) {
      return { error: fileCheck.error };
    }

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'resources');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    return { url: `/resources/${fileName}` };
  } catch (err: any) {
    console.error('Error uploading resource file:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
}

export async function createFaq(prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession();

    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const arm = formData.get('arm') as string;

    // Zod validation
    const validation = faqSchema.safeParse({ question, answer, arm });
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    const id = crypto.randomUUID();
    await query(
      'INSERT INTO faqs (id, question, answer, arm) VALUES (?, ?, ?, ?)',
      [id, question.trim(), answer.trim(), arm || null]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_FAQ',
      targetId: id,
      details: { question },
    });

    revalidatePath('/admin/faqs');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error creating FAQ:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/faqs');
}

export async function updateFaq(id: string, prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession();

    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const arm = formData.get('arm') as string;

    // Zod validation
    const validation = faqSchema.safeParse({ question, answer, arm });
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    await query(
      'UPDATE faqs SET question = ?, answer = ?, arm = ? WHERE id = ?',
      [question.trim(), answer.trim(), arm || null, id]
    );

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_FAQ',
      targetId: id,
      details: { question },
    });

    revalidatePath('/admin/faqs');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error updating FAQ:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/faqs');
}

export async function deleteFaq(id: string) {
  try {
    const adminUser = await verifyAdminSession();

    await query('DELETE FROM faqs WHERE id = ?', [id]);

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_FAQ',
      targetId: id,
    });

    revalidatePath('/admin/faqs');
    revalidatePath('/library');
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err;
    console.error('Error deleting FAQ:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }

  redirect('/admin/faqs');
}

export async function toggleLeadContacted(id: string, contacted: boolean) {
  try {
    await verifyAdminSession();

    await query(
      'UPDATE contact_messages SET contacted = ? WHERE id = ?',
      [contacted ? 1 : 0, id]
    );

    revalidatePath('/admin/leads');
    return { success: true };
  } catch (err: any) {
    console.error('Error toggling lead status:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
}

export async function saveGlossaryTerm(id: string | null, payload: any) {
  try {
    const adminUser = await verifyAdminSession();

    const { glossarySchema } = await import('@/lib/validations/admin');

    const validation = glossarySchema.safeParse(payload);
    if (!validation.success) {
      return { error: validation.error.issues[0].message };
    }

    const slugsStr = JSON.stringify(payload.related_term_slugs || []);

    const term = payload.term.trim();
    const slug = payload.slug.trim();
    const short_definition = payload.short_definition.trim();
    const full_explanation = payload.full_explanation ? sanitizeRichText(payload.full_explanation.trim()) : null;
    const arm = payload.arm;

    if (id) {
      await query(
        'UPDATE glossary_terms SET term = ?, slug = ?, short_definition = ?, full_explanation = ?, arm = ?, related_term_slugs = ? WHERE id = ?',
        [term, slug, short_definition, full_explanation, arm, slugsStr, id]
      );

      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'UPDATE_GLOSSARY',
        targetId: id,
        details: { term },
      });

      revalidatePath('/admin/glossary');
      revalidatePath('/glossary');
      revalidatePath(`/glossary/${slug}`);
      return { success: true, data: { id, term, slug, short_definition, full_explanation, arm, related_term_slugs: payload.related_term_slugs, updated_at: new Date().toISOString() } };
    } else {
      const newId = crypto.randomUUID();
      await query(
        'INSERT INTO glossary_terms (id, term, slug, short_definition, full_explanation, arm, related_term_slugs) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newId, term, slug, short_definition, full_explanation, arm, slugsStr]
      );

      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'CREATE_GLOSSARY',
        targetId: newId,
        details: { term },
      });

      revalidatePath('/admin/glossary');
      revalidatePath('/glossary');
      return { success: true, data: { id: newId, term, slug, short_definition, full_explanation, arm, related_term_slugs: payload.related_term_slugs, updated_at: new Date().toISOString() } };
    }
  } catch (err: any) {
    console.error('Error saving glossary term:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
}

export async function deleteGlossaryTerm(id: string) {
  try {
    const adminUser = await verifyAdminSession();

    await query('DELETE FROM glossary_terms WHERE id = ?', [id]);

    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_GLOSSARY',
      targetId: id,
    });

    revalidatePath('/admin/glossary');
    revalidatePath('/glossary');
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting glossary term:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
}

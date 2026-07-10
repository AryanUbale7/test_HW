'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/supabase/auth-check'
import { resourceSchema, faqSchema } from '@/lib/validations/admin'
import { validateUploadedFile } from '@/lib/utils/magicBytes'
import { writeAuditLog } from '@/lib/supabase/audit'
import { sanitizeRichText } from '@/lib/utils/sanitize'

export async function createResource(prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file_url = formData.get('file_url') as string
    const gated_by_email = formData.get('gated_by_email') === 'on'

    // Zod validation
    const validation = resourceSchema.safeParse({ title, description, file_url, gated_by_email })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('resources').insert({
      title: title.trim(),
      description: description?.trim() || null,
      file_url: file_url || null,
      gated_by_email,
    }).select('id').single()

    if (error) {
      console.error('Resource creation failed:', error.message)
      return { error: 'Database save failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_RESOURCE',
      targetId: data.id,
      details: { title },
    })

    revalidatePath('/admin/resources')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error creating resource:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/resources')
}

export async function updateResource(id: string, prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const file_url = formData.get('file_url') as string
    const gated_by_email = formData.get('gated_by_email') === 'on'

    // Zod validation
    const validation = resourceSchema.safeParse({ title, description, file_url, gated_by_email })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    const supabase = await createAdminClient()
    const { error } = await supabase.from('resources').update({
      title: title.trim(),
      description: description?.trim() || null,
      file_url: file_url || null,
      gated_by_email,
    }).eq('id', id)

    if (error) {
      console.error('Resource update failed:', error.message)
      return { error: 'Database update failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_RESOURCE',
      targetId: id,
      details: { title },
    })

    revalidatePath('/admin/resources')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error updating resource:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/resources')
}

export async function deleteResource(id: string) {
  try {
    const adminUser = await verifyAdminSession()

    const supabase = await createAdminClient()
    const { error } = await supabase.from('resources').delete().eq('id', id)

    if (error) {
      console.error('Resource deletion failed:', error.message)
      return { error: 'Database delete failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_RESOURCE',
      targetId: id,
    })

    revalidatePath('/admin/resources')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error deleting resource:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/resources')
}

export async function uploadResourceFile(formData: FormData) {
  try {
    await verifyAdminSession()

    const file = formData.get('file') as File
    if (!file || file.size === 0) return { error: 'No file provided' }

    // Magic-byte check and size checks (PDF up to 20MB)
    const fileCheck = await validateUploadedFile(file, ['pdf'], 20 * 1024 * 1024)
    if (!fileCheck.isValid) {
      return { error: fileCheck.error }
    }

    const supabase = await createAdminClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

    const { error } = await supabase.storage.from('resources').upload(fileName, file)
    if (error) {
      console.error('File storage upload failed:', error.message)
      return { error: 'Upload failed. Please try again.' }
    }

    const { data: { publicUrl } } = supabase.storage.from('resources').getPublicUrl(fileName)
    return { url: publicUrl }
  } catch (err: any) {
    console.error('Error uploading resource file:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

export async function createFaq(prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession()

    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    const arm = formData.get('arm') as string

    // Zod validation
    const validation = faqSchema.safeParse({ question, answer, arm })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('faqs').insert({
      question: question.trim(),
      answer: answer.trim(),
      arm: arm || null,
    }).select('id').single()

    if (error) {
      console.error('FAQ creation failed:', error.message)
      return { error: 'Database save failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'CREATE_FAQ',
      targetId: String(data.id),
      details: { question },
    })

    revalidatePath('/admin/faqs')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error creating FAQ:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/faqs')
}

export async function updateFaq(id: string, prevState: any, formData: FormData) {
  try {
    const adminUser = await verifyAdminSession()

    const question = formData.get('question') as string
    const answer = formData.get('answer') as string
    const arm = formData.get('arm') as string

    // Zod validation
    const validation = faqSchema.safeParse({ question, answer, arm })
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    const supabase = await createAdminClient()
    const { error } = await supabase.from('faqs').update({
      question: question.trim(),
      answer: answer.trim(),
      arm: arm || null,
    }).eq('id', id)

    if (error) {
      console.error('FAQ update failed:', error.message)
      return { error: 'Database update failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'UPDATE_FAQ',
      targetId: id,
      details: { question },
    })

    revalidatePath('/admin/faqs')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error updating FAQ:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/faqs')
}

export async function deleteFaq(id: string) {
  try {
    const adminUser = await verifyAdminSession()

    const supabase = await createAdminClient()
    const { error } = await supabase.from('faqs').delete().eq('id', id)

    if (error) {
      console.error('FAQ deletion failed:', error.message)
      return { error: 'Database delete failed. Please try again.' }
    }

    // Write audit log
    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_FAQ',
      targetId: id,
    })

    revalidatePath('/admin/faqs')
    revalidatePath('/library')
  } catch (err: any) {
    if (err && err.message === 'NEXT_REDIRECT') throw err
    console.error('Error deleting FAQ:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }

  redirect('/admin/faqs')
}

export async function toggleLeadContacted(id: string, contacted: boolean) {
  try {
    await verifyAdminSession()

    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('contact_messages')
      .update({ contacted })
      .eq('id', id)

    if (error) {
      console.error('Toggle lead status failed:', error.message)
      return { error: 'Failed to update lead status. Please try again.' }
    }

    revalidatePath('/admin/leads')
    return { success: true }
  } catch (err: any) {
    console.error('Error toggling lead status:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

export async function saveGlossaryTerm(id: string | null, payload: any) {
  try {
    const adminUser = await verifyAdminSession()

    // Import schema
    const { glossarySchema } = await import('@/lib/validations/admin')

    const validation = glossarySchema.safeParse(payload)
    if (!validation.success) {
      return { error: validation.error.issues[0].message }
    }

    const supabase = await createAdminClient()
    const glossaryPayload = {
      term: payload.term.trim(),
      slug: payload.slug.trim(),
      short_definition: payload.short_definition.trim(),
      full_explanation: payload.full_explanation ? sanitizeRichText(payload.full_explanation.trim()) : null,
      arm: payload.arm,
      related_term_slugs: payload.related_term_slugs || [],
    }

    if (id) {
      const { data, error } = await supabase
        .from('glossary_terms')
        .update(glossaryPayload)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Glossary update failed:', error.message)
        return { error: 'Database update failed. Please try again.' }
      }

      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'UPDATE_GLOSSARY',
        targetId: id,
        details: { term: payload.term },
      })

      revalidatePath('/admin/glossary')
      revalidatePath('/glossary')
      revalidatePath(`/glossary/${payload.slug}`)
      return { success: true, data }
    } else {
      const { data, error } = await supabase
        .from('glossary_terms')
        .insert(glossaryPayload)
        .select()
        .single()

      if (error) {
        console.error('Glossary insert failed:', error.message)
        return { error: 'Database insert failed. Please try again.' }
      }

      await writeAuditLog({
        adminEmail: adminUser.email || 'unknown',
        action: 'CREATE_GLOSSARY',
        targetId: data.id,
        details: { term: payload.term },
      })

      revalidatePath('/admin/glossary')
      revalidatePath('/glossary')
      return { success: true, data }
    }
  } catch (err: any) {
    console.error('Error saving glossary term:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}

export async function deleteGlossaryTerm(id: string) {
  try {
    const adminUser = await verifyAdminSession()

    const supabase = await createAdminClient()
    const { error } = await supabase.from('glossary_terms').delete().eq('id', id)

    if (error) {
      console.error('Glossary delete failed:', error.message)
      return { error: 'Database delete failed. Please try again.' }
    }

    await writeAuditLog({
      adminEmail: adminUser.email || 'unknown',
      action: 'DELETE_GLOSSARY',
      targetId: id,
    })

    revalidatePath('/admin/glossary')
    revalidatePath('/glossary')
    return { success: true }
  } catch (err: any) {
    console.error('Error deleting glossary term:', err)
    return { error: err.message || 'An unexpected error occurred.' }
  }
}


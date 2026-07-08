'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createResource(prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const file_url = formData.get('file_url') as string
  const gated_by_email = formData.get('gated_by_email') === 'on'

  if (!title?.trim()) return { error: 'Title is required' }

  const { error } = await supabase.from('resources').insert({
    title: title.trim(),
    description: description?.trim() || null,
    file_url: file_url || null,
    gated_by_email,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/resources')
  revalidatePath('/library')
  redirect('/admin/resources')
}

export async function updateResource(id: string, prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const file_url = formData.get('file_url') as string
  const gated_by_email = formData.get('gated_by_email') === 'on'

  if (!title?.trim()) return { error: 'Title is required' }

  const { error } = await supabase.from('resources').update({
    title: title.trim(),
    description: description?.trim() || null,
    file_url: file_url || null,
    gated_by_email,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/resources')
  revalidatePath('/library')
  redirect('/admin/resources')
}

export async function deleteResource(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/resources')
  revalidatePath('/library')
  redirect('/admin/resources')
}

export async function uploadResourceFile(formData: FormData) {
  const supabase = await createAdminClient()
  const file = formData.get('file') as File
  if (!file || file.size === 0) return { error: 'No file provided' }
  if (file.size > 20 * 1024 * 1024) return { error: 'File must be under 20MB' }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`

  const { error } = await supabase.storage.from('resources').upload(fileName, file)
  if (error) return { error: error.message }

  const { data: { publicUrl } } = supabase.storage.from('resources').getPublicUrl(fileName)
  return { url: publicUrl }
}

export async function createFaq(prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const arm = formData.get('arm') as string

  if (!question?.trim()) return { error: 'Question is required' }
  if (!answer?.trim()) return { error: 'Answer is required' }

  const { error } = await supabase.from('faqs').insert({
    question: question.trim(),
    answer: answer.trim(),
    arm: arm || null,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/faqs')
  revalidatePath('/library')
  redirect('/admin/faqs')
}

export async function updateFaq(id: string, prevState: any, formData: FormData) {
  const supabase = await createAdminClient()

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const arm = formData.get('arm') as string

  if (!question?.trim()) return { error: 'Question is required' }
  if (!answer?.trim()) return { error: 'Answer is required' }

  const { error } = await supabase.from('faqs').update({
    question: question.trim(),
    answer: answer.trim(),
    arm: arm || null,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/faqs')
  revalidatePath('/library')
  redirect('/admin/faqs')
}

export async function deleteFaq(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/faqs')
  revalidatePath('/library')
  redirect('/admin/faqs')
}

export async function toggleLeadContacted(id: string, contacted: boolean) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('contact_messages')
    .update({ contacted })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/leads')
  return { success: true }
}

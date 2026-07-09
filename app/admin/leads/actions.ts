'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function toggleContactedStatus(id: number, currentStatus: boolean) {
  const { error } = await supabaseAdmin
    .from('ContactMessage')
    .update({ contacted: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Error updating contacted status:', error)
    throw new Error('Failed to update status')
  }

  revalidatePath('/admin/leads')
}

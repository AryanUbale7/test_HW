'use server'

import { query } from '@/lib/mysql'
import { revalidatePath } from 'next/cache'

export async function toggleContactedStatus(id: string | number, currentStatus: boolean) {
  try {
    await query(
      'UPDATE contact_messages SET contacted = ? WHERE id = ?',
      [currentStatus ? 0 : 1, id]
    );
  } catch (error) {
    console.error('Error updating contacted status:', error)
    throw new Error('Failed to update status')
  }

  revalidatePath('/admin/leads')
}

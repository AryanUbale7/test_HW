import { createAdminClient } from '@/lib/supabase/server'
import { FaqsAdmin } from '@/components/admin/FaqsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminFaqsPage() {
  const supabase = await createAdminClient()
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: false })

  return <FaqsAdmin faqs={faqs || []} />
}

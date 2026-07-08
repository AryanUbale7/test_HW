import { createAdminClient } from '@/lib/supabase/server'
import { LeadsAdmin } from '@/components/admin/LeadsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const supabase = await createAdminClient()
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return <LeadsAdmin messages={messages || []} />
}

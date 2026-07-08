import { createAdminClient } from '@/lib/supabase/server'
import { NewsletterAdmin } from '@/components/admin/NewsletterAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  const supabase = await createAdminClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  return <NewsletterAdmin subscribers={subscribers || []} />
}

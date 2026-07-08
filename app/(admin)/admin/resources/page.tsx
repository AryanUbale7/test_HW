import { createAdminClient } from '@/lib/supabase/server'
import { ResourcesAdmin } from '@/components/admin/ResourcesAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminResourcesPage() {
  const supabase = await createAdminClient()
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  return <ResourcesAdmin resources={resources || []} />
}

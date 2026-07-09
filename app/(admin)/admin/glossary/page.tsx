import { createAdminClient } from '@/lib/supabase/server'
import { GlossaryAdmin } from '@/components/admin/GlossaryAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminGlossaryPage() {
  const supabase = await createAdminClient()
  const { data: terms } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term', { ascending: true })

  return <GlossaryAdmin terms={terms || []} />
}

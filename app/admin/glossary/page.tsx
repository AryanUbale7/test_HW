import { getAllGlossaryTerms } from '@/lib/queries/glossary'
import { GlossaryAdmin } from '@/components/admin/GlossaryAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminGlossaryPage() {
  const terms = await getAllGlossaryTerms()
  return <GlossaryAdmin terms={terms} />
}

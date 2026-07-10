import { getAdminGlossaryTerms } from '@/lib/queries/glossary'
import { GlossaryAdmin } from '@/components/admin/GlossaryAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminGlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const { terms, total } = await getAdminGlossaryTerms({ page: currentPage, limit: 20 })
  return <GlossaryAdmin key={currentPage} terms={terms} total={total} currentPage={currentPage} />
}

import { getAdminFaqs } from '@/lib/queries/faqs'
import { FaqsAdmin } from '@/components/admin/FaqsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const { faqs, total } = await getAdminFaqs({ page: currentPage, limit: 20 })
  return <FaqsAdmin faqs={faqs} total={total} currentPage={currentPage} />
}

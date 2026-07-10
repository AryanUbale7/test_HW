import { getAllContactMessages } from '@/lib/queries/contact'
import { LeadsAdmin } from '@/components/admin/LeadsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const { messages, total } = await getAllContactMessages({ page: currentPage, limit: 20 })
  return <LeadsAdmin key={currentPage} messages={messages} total={total} currentPage={currentPage} />
}

import { getAllSubscribers } from '@/lib/queries/newsletter'
import { NewsletterAdmin } from '@/components/admin/NewsletterAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const { subscribers, total } = await getAllSubscribers({ page: currentPage, limit: 20 })
  return <NewsletterAdmin subscribers={subscribers} total={total} currentPage={currentPage} />
}

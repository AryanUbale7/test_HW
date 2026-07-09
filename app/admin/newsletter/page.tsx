import { getAllSubscribers } from '@/lib/queries/newsletter'
import { NewsletterAdmin } from '@/components/admin/NewsletterAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletterPage() {
  const subscribers = await getAllSubscribers()
  return <NewsletterAdmin subscribers={subscribers} />
}

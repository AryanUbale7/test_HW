import { getAdminFaqs } from '@/lib/queries/faqs'
import { FaqsAdmin } from '@/components/admin/FaqsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminFaqsPage() {
  const faqs = await getAdminFaqs()
  return <FaqsAdmin faqs={faqs} />
}

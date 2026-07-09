import { getAllContactMessages } from '@/lib/queries/contact'
import { LeadsAdmin } from '@/components/admin/LeadsAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const messages = await getAllContactMessages()
  return <LeadsAdmin messages={messages} />
}

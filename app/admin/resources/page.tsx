import { getAdminResources } from '@/lib/queries/resources'
import { ResourcesAdmin } from '@/components/admin/ResourcesAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const { resources, total } = await getAdminResources({ page: currentPage, limit: 20 })
  return <ResourcesAdmin resources={resources} total={total} currentPage={currentPage} />
}

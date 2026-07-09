import { getAdminResources } from '@/lib/queries/resources'
import { ResourcesAdmin } from '@/components/admin/ResourcesAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminResourcesPage() {
  const resources = await getAdminResources()
  return <ResourcesAdmin resources={resources} />
}

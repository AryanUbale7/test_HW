import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminMain } from '@/components/admin/AdminMain'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      <AdminSidebar />
      <AdminMain>
        {children}
      </AdminMain>
    </div>
  )
}

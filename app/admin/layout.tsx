import { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminMain } from '@/components/admin/AdminMain'

export const metadata: Metadata = {
  title: 'Honworth Admin',
  description: 'Honworth Content Studio admin panel',
  robots: {
    index: false,
    follow: false,
  },
}

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

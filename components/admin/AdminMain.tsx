'use client'

import { usePathname } from 'next/navigation'

export function AdminMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return <main className="flex-1">{children}</main>
  }

  return (
    <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 overflow-x-hidden">
      {children}
    </main>
  )
}

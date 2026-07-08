'use client'

import { usePathname } from 'next/navigation'

export function AdminMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return <main className="flex-1">{children}</main>
  }

  return (
    <main className="flex-1 ml-64 p-8">
      {children}
    </main>
  )
}

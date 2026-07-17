'use client'

import { usePathname } from 'next/navigation'

import { logout } from '@/lib/actions/auth'
import { LogOut } from 'lucide-react'

export function AdminMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return <main className="flex-1">{children}</main>
  }

  return (
    <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 overflow-x-hidden">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Honworth Management Suite</span>
        </div>
        <form action={logout}>
          <button 
            type="submit" 
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:text-red-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </form>
      </header>
      {children}
    </main>
  )
}

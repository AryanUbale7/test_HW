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
    <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 overflow-x-hidden min-h-screen bg-[#FDFBF7]">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between border-b border-sage/20 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest font-sans">Honworth Management Suite</span>
        </div>
        <form action={logout}>
          <button 
            type="submit" 
            className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal/80 hover:text-white bg-white border border-sage/30 rounded-md hover:bg-gold hover:border-gold shadow-sm transition-all active:scale-95 cursor-pointer font-semibold font-sans uppercase tracking-wider"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </form>
      </header>
      {children}
    </main>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen, HelpCircle, Mail, LogOut, Home, Send } from 'lucide-react'
import { logout } from '@/lib/actions/auth'

export function AdminSidebar() {
  const pathname = usePathname()
  
  if (pathname === '/admin/login') {
    return null
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Resources', href: '/admin/resources', icon: FolderOpen },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Leads', href: '/admin/leads', icon: Mail },
    { name: 'Newsletter', href: '/admin/newsletter', icon: Send },
  ]

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-slate-300 p-6 flex flex-col">
      <div className="mb-10 px-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Admin Console</h2>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              prefetch={false}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white font-medium shadow-sm' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-slate-800 mt-auto">
        <form action={logout}>
          <button 
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-md transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

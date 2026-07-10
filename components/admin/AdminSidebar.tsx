'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen, HelpCircle, Mail, LogOut, Home, Send, BookOpen, Menu, X } from 'lucide-react'
import { logout } from '@/lib/actions/auth'
import { useState } from 'react'

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  if (pathname === '/admin/login') {
    return null
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Resources', href: '/admin/resources', icon: FolderOpen },
    { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { name: 'Glossary', href: '/admin/glossary', icon: BookOpen },
    { name: 'Leads', href: '/admin/leads', icon: Mail },
    { name: 'Newsletter', href: '/admin/newsletter', icon: Send },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-slate-900 text-white rounded-md md:hidden shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
        />
      )}

      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-slate-300 p-6 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="mb-10 px-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-tight">Admin Console</h2>
          {/* Close button on mobile */}
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white md:hidden focus:outline-none"
            aria-label="Close Navigation Menu"
          >
            <X size={20} />
          </button>
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
                onClick={() => setIsOpen(false)}
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
    </>
  )
}

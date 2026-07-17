'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, FolderOpen, HelpCircle, Mail, LogOut, Home, Send, BookOpen, Menu, X } from 'lucide-react'
import { logout } from '@/lib/actions/auth'
import { useState } from 'react'
import Image from 'next/image'

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
        <div className="mb-10 px-2 flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <Link href="/" className="flex items-center justify-start hover:opacity-90 transition-opacity w-full">
              <Image 
                src="/logo/logo.png" 
                alt="Honworth Logo" 
                width={180} 
                height={60} 
                className="object-contain w-auto h-12 rounded-sm" 
                priority
              />
            </Link>
            {/* Close button on mobile */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white md:hidden focus:outline-none ml-2"
              aria-label="Close Navigation Menu"
            >
              <X size={20} />
            </button>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold select-none px-1">Management System</span>
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
      </aside>
    </>
  )
}

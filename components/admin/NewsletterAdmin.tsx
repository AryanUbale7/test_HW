'use client'

import { Download, Mail, Calendar, Info } from 'lucide-react'
import Link from 'next/link'

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  source: string | null
}

export function NewsletterAdmin({ 
  subscribers,
  total = 0,
  currentPage = 1,
}: { 
  subscribers: Subscriber[]
  total?: number
  currentPage?: number
}) {
  const exportToCSV = () => {
    if (subscribers.length === 0) return

    // Define CSV headers
    const headers = ['Email', 'Subscribed At', 'Source']
    
    // Format rows
    const rows = subscribers.map(s => [
      s.email,
      new Date(s.subscribed_at).toISOString(),
      s.source || 'Unknown'
    ])

    // Build CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `honworth_subscribers_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Newsletter Subscribers</h1>
          <p className="text-slate-500 mt-1">View and manage newsletter sign-ups.</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <Download size={16} />
          Export as CSV
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Subscribed At</th>
              <th className="px-6 py-3 font-medium">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <a href={`mailto:${s.email}`} className="hover:underline hover:text-blue-600">
                      {s.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(s.subscribed_at).toLocaleDateString()} {new Date(s.subscribed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    {s.source || 'Website Footer'}
                  </div>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {total > 20 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border border-t-0 border-slate-200 rounded-b-lg shadow-sm">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 20, total)}</span> of{' '}
            <span className="font-medium">{total}</span> items
          </div>
          <div className="flex gap-2">
            <Link
              href={currentPage > 2 ? `/admin/newsletter?page=${currentPage - 1}` : '/admin/newsletter'}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/newsletter?page=${currentPage + 1}`}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage * 20 >= total ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

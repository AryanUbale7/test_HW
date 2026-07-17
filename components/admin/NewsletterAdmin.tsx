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
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center pb-2 border-b border-sage/10">
        <div>
          <h1 className="text-2xl font-serif text-deep-green font-bold tracking-tight">Newsletter Subscribers</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">View, track, and export newsletter subscription sign-ups.</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={subscribers.length === 0}
          className="flex items-center gap-2 bg-gold hover:bg-gold/90 disabled:bg-[#FAF6EE]/80 disabled:text-charcoal/30 disabled:border-sage/10 disabled:cursor-not-allowed text-white px-4 py-2 border border-transparent rounded-md text-sm font-semibold shadow-sm transition-all duration-200"
        >
          <Download size={16} />
          Export as CSV
        </button>
      </div>

      <div className="bg-white rounded-lg border border-sage/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAF6EE] border-b border-sage/20 text-deep-green font-semibold">
            <tr>
              <th className="px-6 py-3.5 font-semibold">Email Address</th>
              <th className="px-6 py-3.5 font-semibold">Subscribed Date</th>
              <th className="px-6 py-3.5 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage/10 text-charcoal">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-[#FAF6EE]/10 transition-colors">
                <td className="px-6 py-4 font-semibold">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sage" />
                    <a href={`mailto:${s.email}`} className="hover:underline hover:text-gold transition-colors">
                      {s.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-charcoal/60 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sage" />
                    <span>{new Date(s.subscribed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span className="text-charcoal/30">|</span>
                    <span>{new Date(s.subscribed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-charcoal/70 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-sage" />
                    <span>{s.source || 'Website Footer'}</span>
                  </div>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-charcoal/40 font-sans">
                  No subscribers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {total > 20 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border border-t-0 border-sage/20 rounded-b-lg shadow-sm">
          <div className="text-sm text-charcoal/60">
            Showing <span className="font-semibold">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * 20, total)}</span> of{' '}
            <span className="font-semibold">{total}</span> items
          </div>
          <div className="flex gap-2">
            <Link
              href={currentPage > 2 ? `/admin/newsletter?page=${currentPage - 1}` : '/admin/newsletter'}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/newsletter?page=${currentPage + 1}`}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
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

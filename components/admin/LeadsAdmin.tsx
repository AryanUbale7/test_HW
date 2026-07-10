'use client'

import { useState } from 'react'
import { toggleLeadContacted } from '@/lib/actions/admin'
import { CheckSquare, Square, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface ContactMessage {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  message: string | null
  consent_given: boolean | null
  contacted: boolean
  created_at: string
}

export function LeadsAdmin({ 
  messages: initialMessages,
  total = 0,
  currentPage = 1,
}: { 
  messages: ContactMessage[]
  total?: number
  currentPage?: number
}) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    setUpdatingId(id)
    const newStatus = !currentStatus
    
    // Optimistic UI update
    setMessages(prev =>
      prev.map(m => m.id === id ? { ...m, contacted: newStatus } : m)
    )

    const result = await toggleLeadContacted(id, newStatus)
    if (result && result.error) {
      alert(result.error || 'Failed to update contacted status')
      // Revert status on failure
      setMessages(prev =>
        prev.map(m => m.id === id ? { ...m, contacted: currentStatus } : m)
      )
    }
    setUpdatingId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leads Inbox</h1>
        <p className="text-slate-500 mt-1">Manage contact inquiries and follow-ups.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium w-12">Contacted</th>
              <th className="px-6 py-3 font-medium">Contact Details</th>
              <th className="px-6 py-3 font-medium">Message</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.map((m) => (
              <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${m.contacted ? 'bg-slate-50/50 opacity-75' : ''}`}>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    disabled={updatingId === m.id}
                    onClick={() => handleToggleContacted(m.id, m.contacted)}
                    className="text-slate-500 hover:text-blue-600 focus:outline-none transition-colors disabled:opacity-50"
                  >
                    {m.contacted ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <User className="w-4 h-4 text-slate-400" />
                    {m.name || 'Anonymous'}
                  </div>
                  {m.email && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${m.email}`} className="hover:underline hover:text-blue-600">
                        {m.email}
                      </a>
                    </div>
                  )}
                  {m.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${m.phone}`} className="hover:underline hover:text-blue-600">
                        {m.phone}
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-start max-w-lg">
                    <MessageSquare className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-xs">
                      {m.message || <span className="text-slate-400 italic">No message provided.</span>}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(m.created_at).toLocaleDateString()} {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  No contact messages received yet.
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
              href={currentPage > 2 ? `/admin/leads?page=${currentPage - 1}` : '/admin/leads'}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/leads?page=${currentPage + 1}`}
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

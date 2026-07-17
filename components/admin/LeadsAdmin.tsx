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
    <div className="space-y-6 font-sans">
      <div className="pb-2 border-b border-sage/10">
        <h1 className="text-2xl font-serif text-deep-green font-bold tracking-tight">Leads Inbox</h1>
        <p className="text-xs text-charcoal/60 mt-0.5">Manage contact inquiries, messages, and customer follow-up actions.</p>
      </div>

      <div className="bg-white rounded-lg border border-sage/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAF6EE] border-b border-sage/20 text-deep-green font-semibold">
            <tr>
              <th className="px-6 py-3.5 font-semibold w-12 text-center">Contacted</th>
              <th className="px-6 py-3.5 font-semibold">Contact Details</th>
              <th className="px-6 py-3.5 font-semibold">Message</th>
              <th className="px-6 py-3.5 font-semibold">Received Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage/10 text-charcoal">
            {messages.map((m) => (
              <tr key={m.id} className={`hover:bg-[#FAF6EE]/10 transition-colors ${m.contacted ? 'bg-[#FAF6EE]/5 opacity-70' : ''}`}>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={m.contacted}
                    disabled={updatingId === m.id}
                    onChange={() => handleToggleContacted(m.id, m.contacted)}
                    className="w-4 h-4 text-gold border-sage/30 rounded focus:ring-gold cursor-pointer disabled:opacity-50 transition-all accent-gold"
                  />
                </td>
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-charcoal">
                    <User className="w-4 h-4 text-sage" />
                    {m.name || 'Anonymous'}
                  </div>
                  {m.email && (
                    <div className="flex items-center gap-2 text-xs text-charcoal/60">
                      <Mail className="w-3.5 h-3.5 text-sage" />
                      <a href={`mailto:${m.email}`} className="hover:underline hover:text-gold transition-colors">
                        {m.email}
                      </a>
                    </div>
                  )}
                  {m.phone && (
                    <div className="flex items-center gap-2 text-xs text-charcoal/60">
                      <Phone className="w-3.5 h-3.5 text-sage" />
                      <a href={`tel:${m.phone}`} className="hover:underline hover:text-gold transition-colors">
                        {m.phone}
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 items-start max-w-lg">
                    <MessageSquare className="w-4 h-4 text-sage mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80 whitespace-pre-wrap leading-relaxed text-xs">
                      {m.message || <span className="text-charcoal/30 italic">No message provided.</span>}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-charcoal/60 whitespace-nowrap text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sage" />
                    <span>{new Date(m.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span className="text-charcoal/30">|</span>
                    <span>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-charcoal/40 font-sans">
                  No contact messages received yet.
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
              href={currentPage > 2 ? `/admin/leads?page=${currentPage - 1}` : '/admin/leads'}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/leads?page=${currentPage + 1}`}
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

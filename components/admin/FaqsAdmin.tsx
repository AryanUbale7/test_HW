'use client'

import { useActionState, useState } from 'react'
import { createFaq, updateFaq, deleteFaq } from '@/lib/actions/admin'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import Link from 'next/link'

interface Faq {
  id: string
  question: string
  answer: string
  arm: string | null
  created_at: string
}

export function FaqsAdmin({ 
  faqs,
  total = 0,
  currentPage = 1,
}: { 
  faqs: Faq[]
  total?: number
  currentPage?: number
}) {
  const [editing, setEditing] = useState<Faq | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteFaq(deleteId)
    } catch (err: any) {
      if (err && err.message === 'NEXT_REDIRECT') {
        throw err
      }
      console.error(err)
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  // Group by arm
  const grouped = faqs.reduce((acc: Record<string, Faq[]>, faq) => {
    const key = faq.arm || 'General'
    if (!acc[key]) acc[key] = []
    acc[key].push(faq)
    return acc
  }, {})

  const armOrder = ['Creation', 'Protection', 'Legacy', 'General']
  const sortedArms = armOrder.filter(a => grouped[a])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-sage/10">
        <div>
          <h1 className="text-2xl font-serif text-deep-green font-bold tracking-tight">Frequently Asked Questions (FAQs)</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">Manage the questions and answers displayed in the library support section.</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null) }}
          className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition-all duration-200"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      {(creating || editing) && (
        <FaqForm faq={editing} onCancel={() => { setCreating(false); setEditing(null) }} />
      )}

      {sortedArms.length > 0 ? (
        sortedArms.map(arm => (
          <div key={arm} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gold mb-1 mt-6">{arm} Pillar FAQs</h2>
            <div className="bg-white rounded-lg border border-sage/20 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF6EE] border-b border-sage/20 text-deep-green font-semibold">
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">Question</th>
                    <th className="px-6 py-3.5 font-semibold">Answer</th>
                    <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/10">
                  {grouped[arm].map(faq => (
                    <tr key={faq.id} className="hover:bg-[#FAF6EE]/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-charcoal max-w-xs">{faq.question}</td>
                      <td className="px-6 py-4 text-charcoal/70 max-w-md truncate">{faq.answer}</td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => { setEditing(faq); setCreating(false) }} className="text-gold hover:text-gold/80 transition-colors" title="Edit"><Pencil size={15} /></button>
                        <button onClick={() => setDeleteId(faq.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg border border-sage/20 shadow-sm p-12 text-center">
          <p className="text-sm text-charcoal/40 font-sans">No FAQs found. Create a new one using the button above.</p>
        </div>
      )}

      {/* Pagination controls */}
      {total > 20 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border border-sage/20 rounded-lg shadow-sm mt-6">
          <div className="text-sm text-charcoal/60">
            Showing <span className="font-semibold">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * 20, total)}</span> of{' '}
            <span className="font-semibold">{total}</span> items
          </div>
          <div className="flex gap-2">
            <Link
              href={currentPage > 2 ? `/admin/faqs?page=${currentPage - 1}` : '/admin/faqs'}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/faqs?page=${currentPage + 1}`}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage * 20 >= total ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-sage/20">
            <h3 className="text-lg font-serif text-deep-green font-bold mb-2">Delete this FAQ?</h3>
            <p className="text-sm text-charcoal/70 mb-6">This action cannot be undone. This FAQ will be permanently removed.</p>
            <div className="flex justify-end gap-3 font-sans">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-sage-mist/30 border border-sage/25 rounded-md hover:bg-sage-mist/50 text-charcoal">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50">
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FaqForm({ faq, onCancel }: { faq: Faq | null; onCancel: () => void }) {
  const action = faq ? updateFaq.bind(null, faq.id) : createFaq
  const [state, formAction, isPending] = useActionState(action, { error: '' })

  return (
    <div className="bg-white p-6 rounded-lg border border-sage/20 shadow-sm max-w-2xl">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-sage/10">
        <h2 className="text-lg font-serif text-deep-green font-bold">{faq ? 'Edit FAQ Item' : 'Create New FAQ'}</h2>
        <button onClick={onCancel} className="text-charcoal/40 hover:text-charcoal"><X size={18} /></button>
      </div>
      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">{state.error}</div>}
      <form action={formAction} className="space-y-4 font-sans">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Question *</label>
          <input 
            name="question" 
            defaultValue={faq?.question || ''} 
            required 
            placeholder="e.g., What is the minimum SIP amount?"
            className="w-full px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Answer *</label>
          <textarea 
            name="answer" 
            rows={4} 
            defaultValue={faq?.answer || ''} 
            required 
            placeholder="Write a clear, simple answer for the visitors..."
            className="w-full px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10 resize-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Arm / Pillar Group</label>
          <select 
            name="arm" 
            defaultValue={faq?.arm || ''} 
            className="w-full px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10"
          >
            <option value="">General (No Pillar)</option>
            <option value="Creation">Creation Pillar</option>
            <option value="Protection">Protection Pillar</option>
            <option value="Legacy">Legacy Pillar</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-sage-mist/30 border border-sage/25 rounded-md hover:bg-sage-mist/50 text-charcoal">Cancel</button>
          <button type="submit" disabled={isPending} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gold rounded-md hover:bg-gold/90 disabled:opacity-50">
            {isPending ? 'Saving…' : (faq ? 'Update FAQ' : 'Create FAQ')}
          </button>
        </div>
      </form>
    </div>
  )
}

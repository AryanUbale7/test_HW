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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">FAQs</h1>
        <button
          onClick={() => { setCreating(true); setEditing(null) }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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
          <div key={arm}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 mt-6">{arm}</h2>
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="px-6 py-3 font-medium">Question</th>
                    <th className="px-6 py-3 font-medium">Answer</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grouped[arm].map(faq => (
                    <tr key={faq.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900 max-w-xs">{faq.question}</td>
                      <td className="px-6 py-4 text-slate-600 max-w-md truncate">{faq.answer}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => { setEditing(faq); setCreating(false) }} className="text-slate-500 hover:text-blue-600"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(faq.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
          <p className="text-slate-400">No FAQs yet.</p>
        </div>
      )}

      {/* Pagination controls */}
      {total > 20 && (
        <div className="flex justify-between items-center bg-white px-6 py-4 border border-slate-200 rounded-lg shadow-sm mt-6">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 20, total)}</span> of{' '}
            <span className="font-medium">{total}</span> items
          </div>
          <div className="flex gap-2">
            <Link
              href={currentPage > 2 ? `/admin/faqs?page=${currentPage - 1}` : '/admin/faqs'}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/faqs?page=${currentPage + 1}`}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage * 20 >= total ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete this FAQ?</h3>
            <p className="text-sm text-slate-600 mb-6">This cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50">
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
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">{faq ? 'Edit FAQ' : 'New FAQ'}</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
      </div>
      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">{state.error}</div>}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Question *</label>
          <input name="question" defaultValue={faq?.question || ''} required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Answer *</label>
          <textarea name="answer" rows={4} defaultValue={faq?.answer || ''} required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Arm</label>
          <select name="arm" defaultValue={faq?.arm || ''} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">General</option>
            <option value="Creation">Creation</option>
            <option value="Protection">Protection</option>
            <option value="Legacy">Legacy</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
          <button type="submit" disabled={isPending} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isPending ? 'Saving…' : (faq ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  )
}

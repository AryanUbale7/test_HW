'use client'

import { useActionState, useState, useRef } from 'react'
import { createResource, updateResource, deleteResource, uploadResourceFile } from '@/lib/actions/admin'
import { Plus, Pencil, Trash2, Upload, Loader2, X, FileText } from 'lucide-react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  description: string | null
  file_url: string | null
  gated_by_email: boolean
  created_at: string
}

export function ResourcesAdmin({ 
  resources,
  total = 0,
  currentPage = 1,
}: { 
  resources: Resource[]
  total?: number
  currentPage?: number
}) {
  const [editing, setEditing] = useState<Resource | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteResource(deleteId)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-sage/10">
        <div>
          <h1 className="text-2xl font-serif text-deep-green font-bold tracking-tight">Resources Library</h1>
          <p className="text-xs text-charcoal/60 mt-0.5">Upload and manage downloadable checklists, guides, and PDF assets.</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null) }}
          className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition-all duration-200"
        >
          <Plus size={16} />
          Add Resource
        </button>
      </div>

      {(creating || editing) && (
        <ResourceForm
          resource={editing}
          onCancel={() => { setCreating(false); setEditing(null) }}
        />
      )}

      <div className="bg-white rounded-lg border border-sage/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAF6EE] border-b border-sage/20 text-deep-green font-semibold">
            <tr>
              <th className="px-6 py-3.5 font-semibold">Title</th>
              <th className="px-6 py-3.5 font-semibold">File Path</th>
              <th className="px-6 py-3.5 font-semibold">Access Type</th>
              <th className="px-6 py-3.5 font-semibold">Created Date</th>
              <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage/10 text-charcoal">
            {resources.map((r) => (
              <tr key={r.id} className="hover:bg-[#FAF6EE]/10 transition-colors">
                <td className="px-6 py-4 font-semibold">{r.title}</td>
                <td className="px-6 py-4">
                  {r.file_url ? (
                    <a href={r.file_url} target="_blank" rel="noopener" className="text-gold hover:underline text-xs flex items-center gap-1.5 font-medium">
                      <FileText size={13} /> {r.file_url.split('/').pop()}
                    </a>
                  ) : <span className="text-charcoal/30">—</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    r.gated_by_email 
                      ? 'bg-gold/10 text-gold border-gold/25' 
                      : 'bg-sage-mist/60 text-deep-green border-sage/20'
                  }`}>
                    {r.gated_by_email ? 'Email Gated' : 'Public Access'}
                  </span>
                </td>
                <td className="px-6 py-4 text-charcoal/60 text-xs">{new Date(r.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => { setEditing(r); setCreating(false) }} className="text-gold hover:text-gold/80 transition-colors" title="Edit"><Pencil size={15} /></button>
                  <button onClick={() => setDeleteId(r.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-charcoal/40 font-sans">No downloadable resources added yet.</td></tr>
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
              href={currentPage > 2 ? `/admin/resources?page=${currentPage - 1}` : '/admin/resources'}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/resources?page=${currentPage + 1}`}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-sage/35 rounded-md hover:bg-[#FAF6EE]/20 transition-colors ${
                currentPage * 20 >= total ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-sage/20">
            <h3 className="text-lg font-serif text-deep-green font-bold mb-2">Delete resource?</h3>
            <p className="text-sm text-charcoal/70 mb-6">This action cannot be undone. The uploaded file and metadata will be permanently deleted.</p>
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

function ResourceForm({ resource, onCancel }: { resource: Resource | null; onCancel: () => void }) {
  const action = resource ? updateResource.bind(null, resource.id) : createResource
  const [state, formAction, isPending] = useActionState(action, { error: '' })
  const [fileUrl, setFileUrl] = useState(resource?.file_url || '')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadResourceFile(formData)
      if (result.error) throw new Error(result.error)

      if (result.url) {
        setFileUrl(result.url)
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed')
    }
    setUploading(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-sage/20 shadow-sm max-w-2xl">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-sage/10">
        <h2 className="text-lg font-serif text-deep-green font-bold">{resource ? 'Edit Resource Item' : 'Upload New Resource'}</h2>
        <button onClick={onCancel} className="text-charcoal/40 hover:text-charcoal"><X size={18} /></button>
      </div>
      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">{state.error}</div>}
      <form action={formAction} className="space-y-5 font-sans">
        <input type="hidden" name="file_url" value={fileUrl} />
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Title *</label>
          <input 
            name="title" 
            defaultValue={resource?.title || ''} 
            required 
            placeholder="e.g., Family Financial Checklist"
            className="w-full px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Description</label>
          <textarea 
            name="description" 
            rows={3} 
            defaultValue={resource?.description || ''} 
            placeholder="A short description of this guide..."
            className="w-full px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10 resize-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-1">Downloadable PDF Link / File *</label>
          <div className="flex items-center gap-2">
            <input 
              name="file_url_input" 
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="e.g. https://... or /resources/filename.pdf"
              className="flex-grow px-3.5 py-2.5 border border-sage/30 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-charcoal bg-[#FAF6EE]/10" 
            />
            <button 
              type="button" 
              onClick={() => fileRef.current?.click()} 
              disabled={uploading}
              className="flex items-center gap-2 px-3.5 py-2.5 border border-sage/30 hover:border-gold hover:text-gold rounded-md text-xs text-charcoal/70 bg-sage-mist/20 hover:bg-[#FAF6EE]/40 transition-all disabled:opacity-50 font-semibold shrink-0"
              title="Upload file from computer"
            >
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              Upload
            </button>
          </div>
          <p className="text-[11px] text-charcoal/50 mt-1">Paste a direct PDF URL (e.g., Google Drive / Supabase link) or click Upload to select a file.</p>
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="hidden" onChange={handleFileUpload} />
        </div>
        <div className="flex items-center gap-3 pt-1">
          <input 
            type="checkbox" 
            id="gated_by_email" 
            name="gated_by_email" 
            defaultChecked={resource?.gated_by_email || false} 
            className="rounded border-sage/30 text-gold focus:ring-gold h-4 w-4" 
          />
          <label htmlFor="gated_by_email" className="text-sm font-medium text-charcoal/80 select-none">Require visitors to enter their email to download (Gated)</label>
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-sage/10">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-sage-mist/30 border border-sage/25 rounded-md hover:bg-sage-mist/50 text-charcoal">Cancel</button>
          <button type="submit" disabled={isPending || uploading} className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gold rounded-md hover:bg-gold/90 disabled:opacity-50">
            {uploading ? 'Uploading…' : (isPending ? 'Saving…' : (resource ? 'Update Resource' : 'Create Resource'))}
          </button>
        </div>
      </form>
    </div>
  )
}

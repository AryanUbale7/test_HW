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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resources</h1>
        <button
          onClick={() => { setCreating(true); setEditing(null) }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">File</th>
              <th className="px-6 py-3 font-medium">Gated</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {resources.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{r.title}</td>
                <td className="px-6 py-4">
                  {r.file_url ? (
                    <a href={r.file_url} target="_blank" rel="noopener" className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                      <FileText size={12} /> View file
                    </a>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.gated_by_email ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    {r.gated_by_email ? 'Email gated' : 'Public'}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => { setEditing(r); setCreating(false) }} className="text-slate-500 hover:text-blue-600"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(r.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No resources yet.</td></tr>
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
              href={currentPage > 2 ? `/admin/resources?page=${currentPage - 1}` : '/admin/resources'}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/resources?page=${currentPage + 1}`}
              className={`px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors ${
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete resource?</h3>
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
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900">{resource ? 'Edit Resource' : 'New Resource'}</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
      </div>
      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">{state.error}</div>}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="file_url" value={fileUrl} />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
          <input name="title" defaultValue={resource?.title || ''} required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea name="description" rows={3} defaultValue={resource?.description || ''} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">File</label>
          {fileUrl ? (
            <div className="flex items-center gap-2 text-sm">
              <a href={fileUrl} target="_blank" className="text-blue-600 hover:underline truncate">{fileUrl.split('/').pop()}</a>
              <button type="button" onClick={() => setFileUrl('')} className="text-red-500 hover:text-red-700"><X size={14} /></button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-md text-sm text-slate-500 hover:border-blue-400 hover:text-blue-500 disabled:opacity-50">
              {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : <><Upload size={14} /> Upload file</>}
            </button>
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileUpload} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="gated_by_email" name="gated_by_email" defaultChecked={resource?.gated_by_email || false} className="rounded border-slate-300" />
          <label htmlFor="gated_by_email" className="text-sm text-slate-700">Require email to download (gated)</label>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
          <button type="submit" disabled={isPending || uploading} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {uploading ? 'Uploading…' : (isPending ? 'Saving…' : (resource ? 'Update' : 'Create'))}
          </button>
        </div>
      </form>
    </div>
  )
}

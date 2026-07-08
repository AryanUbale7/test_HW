'use client'

import { useActionState, useState, useEffect } from 'react'
import { RichTextEditor } from './RichTextEditor'
import { CoverImageUpload } from './CoverImageUpload'
import { createPost, updatePost, deletePost } from '@/lib/actions/posts'
import { Trash2, ExternalLink, Save, Loader2 } from 'lucide-react'

interface Author {
  id: string
  name: string
}

interface PostData {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  body?: string
  cover_image_url?: string
  arm?: string
  type?: string
  source_url?: string
  author_id?: string
  seo_title?: string
  seo_description?: string
  status?: string
  published_at?: string
}

interface PostFormProps {
  post?: PostData
  authors: Author[]
  mode: 'create' | 'edit'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const initialState = { errors: {} as Record<string, string>, success: false }

export function PostForm({ post, authors, mode }: PostFormProps) {
  const isEdit = mode === 'edit'

  const boundAction = isEdit && post?.id
    ? updatePost.bind(null, post.id)
    : createPost

  const [state, formAction, isPending] = useActionState(boundAction, initialState)

  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit)
  const [body, setBody] = useState(post?.body || '')
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url || '')
  const [type, setType] = useState(post?.type || '')
  const [status, setStatus] = useState(post?.status || 'draft')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Show success toast
  const [showSuccess, setShowSuccess] = useState(false)
  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
      const t = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(t)
    }
  }, [state.success])

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title))
    }
  }, [title, slugManuallyEdited])

  const handleDelete = async () => {
    if (!post?.id) return
    setDeleting(true)
    await deletePost(post.id)
  }

  const errors = state.errors || {}

  return (
    <form action={formAction} className="space-y-8">
      {/* Hidden fields for body, cover_image_url, status */}
      <input type="hidden" name="body" value={body} />
      <input type="hidden" name="cover_image_url" value={coverUrl} />
      <input type="hidden" name="status" value={status} />

      {/* Success banner */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md text-sm">
          ✓ Post saved successfully!
        </div>
      )}

      {/* Form error */}
      {errors._form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {errors._form}
        </div>
      )}

      {/* Top bar: status toggle + actions */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Status toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Status:</span>
            <button
              type="button"
              onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                status === 'published' ? 'bg-green-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  status === 'published' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${
              status === 'published' ? 'text-green-700' : 'text-amber-700'
            }`}>
              {status === 'published' ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview link */}
          {isEdit && post?.slug && (
            post.status === 'published' ? (
              <a
                href={`/articles/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={14} />
                View Live
              </a>
            ) : (
              <a
                href={`/admin/preview/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
              >
                <ExternalLink size={14} />
                Preview Draft
              </a>
            )
          )}

          {/* Delete button */}
          {isEdit && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}

          {/* Save button */}
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isPending ? 'Saving…' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </div>

      {/* Main content area: two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-slate-300'
                }`}
                placeholder="Post title"
              />
              {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1">
                Slug *
                <span className="text-slate-400 font-normal ml-1">(/articles/{slug || '…'})</span>
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true) }}
                className={`w-full px-3 py-2 border rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.slug ? 'border-red-300' : 'border-slate-300'
                }`}
                placeholder="post-url-slug"
              />
              {errors.slug && <p className="text-red-600 text-xs mt-1">{errors.slug}</p>}
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-1">
                Excerpt {status === 'published' && '*'}
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={post?.excerpt || ''}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.excerpt ? 'border-red-300' : 'border-slate-300'
                }`}
                placeholder="Brief description shown in article listings"
              />
              {errors.excerpt && <p className="text-red-600 text-xs mt-1">{errors.excerpt}</p>}
            </div>
          </div>

          {/* Body editor */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Body {status === 'published' && '*'}
            </label>
            <RichTextEditor
              content={body}
              onChange={setBody}
              error={errors.body}
            />
          </div>

          {/* SEO section */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">SEO Settings</h3>
            <div>
              <label htmlFor="seo_title" className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
              <input
                id="seo_title"
                name="seo_title"
                type="text"
                defaultValue={post?.seo_title || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Custom title for search engines (optional)"
              />
            </div>
            <div>
              <label htmlFor="seo_description" className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
              <textarea
                id="seo_description"
                name="seo_description"
                rows={2}
                defaultValue={post?.seo_description || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Custom description for search engines (optional)"
              />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Cover image */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
            <CoverImageUpload value={coverUrl} onChange={setCoverUrl} />
          </div>

          {/* Taxonomies */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Classification</h3>

            <div>
              <label htmlFor="arm" className="block text-sm font-medium text-slate-700 mb-1">Arm *</label>
              <select
                id="arm"
                name="arm"
                defaultValue={post?.arm || ''}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.arm ? 'border-red-300' : 'border-slate-300'
                }`}
              >
                <option value="">Select arm…</option>
                <option value="Creation">Creation</option>
                <option value="Protection">Protection</option>
                <option value="Legacy">Legacy</option>
              </select>
              {errors.arm && <p className="text-red-600 text-xs mt-1">{errors.arm}</p>}
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.type ? 'border-red-300' : 'border-slate-300'
                }`}
              >
                <option value="">Select type…</option>
                <option value="Insight">Insight</option>
                <option value="News">News</option>
              </select>
              {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type}</p>}
            </div>

            {type === 'News' && (
              <div>
                <label htmlFor="source_url" className="block text-sm font-medium text-slate-700 mb-1">
                  Source URL {status === 'published' && '*'}
                </label>
                <input
                  id="source_url"
                  name="source_url"
                  type="url"
                  defaultValue={post?.source_url || ''}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.source_url ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="https://…"
                />
                {errors.source_url && <p className="text-red-600 text-xs mt-1">{errors.source_url}</p>}
              </div>
            )}

            <div>
              <label htmlFor="author_id" className="block text-sm font-medium text-slate-700 mb-1">Author</label>
              <select
                id="author_id"
                name="author_id"
                defaultValue={post?.author_id || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete this post?</h3>
            <p className="text-sm text-slate-600 mb-6">
              This action cannot be undone. The post &ldquo;{title || 'Untitled'}&rdquo; will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

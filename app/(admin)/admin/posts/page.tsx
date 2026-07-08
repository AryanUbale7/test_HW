import { createAdminClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const supabase = await createAdminClient()

  let query = supabase
    .from('posts')
    .select('id, title, arm, type, status, published_at')
    .order('created_at', { ascending: false })

  if (filter === 'draft') {
    query = query.eq('status', 'draft')
  } else if (filter === 'published') {
    query = query.eq('status', 'published')
  }

  const { data: posts } = await query

  const activeFilter = filter || 'all'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Posts</h1>
        <Link
          href="/admin/posts/new"
          prefetch={false}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-md w-fit">
        {[
          { key: 'all', label: 'All' },
          { key: 'draft', label: 'Drafts' },
          { key: 'published', label: 'Published' },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === 'all' ? '/admin/posts' : `/admin/posts?filter=${tab.key}`}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              activeFilter === tab.key
                ? 'bg-white text-slate-900 font-medium shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Posts table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Arm</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    prefetch={false}
                    className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-600">{post.arm || '—'}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-xs uppercase tracking-wider text-slate-600">
                    {post.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString()
                    : '—'}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    prefetch={false}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

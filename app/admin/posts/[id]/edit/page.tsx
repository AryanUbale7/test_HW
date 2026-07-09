import { getAdminPostById, getAuthors } from '@/lib/queries/posts'
import { PostForm } from '@/components/admin/PostForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [post, authors] = await Promise.all([
    getAdminPostById(id),
    getAuthors()
  ])

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts" prefetch={false} className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Post</h1>
      </div>

      <PostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || undefined,
          body: post.body || undefined,
          cover_image_url: post.cover_image_url || undefined,
          arm: post.arm,
          type: post.type,
          source_url: post.source_url || undefined,
          author_id: post.author_id || undefined,
          seo_title: post.seo_title || undefined,
          seo_description: post.seo_description || undefined,
          status: post.status,
          published_at: post.published_at || undefined,
        }}
        authors={authors}
        mode="edit"
      />
    </div>
  )
}

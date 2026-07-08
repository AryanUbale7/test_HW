import { createAdminClient } from '@/lib/supabase/server'
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
  const supabase = await createAdminClient()

  const [{ data: post }, { data: authors }] = await Promise.all([
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single(),
    supabase
      .from('authors')
      .select('id, name')
      .order('name'),
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
          excerpt: post.excerpt,
          body: post.body,
          cover_image_url: post.cover_image_url,
          arm: post.arm,
          type: post.type,
          source_url: post.source_url,
          author_id: post.author_id,
          seo_title: post.seo_title,
          seo_description: post.seo_description,
          status: post.status,
          published_at: post.published_at,
        }}
        authors={authors || []}
        mode="edit"
      />
    </div>
  )
}

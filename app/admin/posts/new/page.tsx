import { getAuthors } from '@/lib/queries/posts'
import { PostForm } from '@/components/admin/PostForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewPostPage() {
  const authors = await getAuthors()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts" prefetch={false} className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Post</h1>
      </div>

      <PostForm authors={authors} mode="create" />
    </div>
  )
}

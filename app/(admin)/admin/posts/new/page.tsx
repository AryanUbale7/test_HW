import { createAdminClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/admin/PostForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewPostPage() {
  const supabase = await createAdminClient()
  const { data: authors } = await supabase
    .from('authors')
    .select('id, name')
    .order('name')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts" prefetch={false} className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Post</h1>
      </div>

      <PostForm authors={authors || []} mode="create" />
    </div>
  )
}

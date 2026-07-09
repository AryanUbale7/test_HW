import { Metadata } from 'next'
import { getAdminPostBySlug } from '@/lib/queries/posts'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils/formatDate'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function DraftPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Fetch post regardless of status (admin-only route, protected by middleware)
  const post = await getAdminPostBySlug(slug)

  if (!post) notFound()

  const author = Array.isArray(post.authors) ? post.authors[0] : post.authors

  return (
    <div className="bg-white min-h-screen">
      {/* Draft banner */}
      {post.status === 'draft' && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-800 text-sm font-medium text-center py-2 px-4">
          ⚠ DRAFT PREVIEW — This post is not published. Only you can see this.
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            {post.arm && (
              <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded bg-slate-100 text-slate-600">
                {post.arm}
              </span>
            )}
            {post.type && (
              <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded bg-slate-100 text-slate-600">
                {post.type}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-serif text-slate-900 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex justify-center items-center gap-3 text-sm text-slate-500">
            {post.published_at && (
              <time>{formatDate(post.published_at, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            )}
            {author?.name && (
              <>
                <span>·</span>
                <span>By {author.name}</span>
              </>
            )}
          </div>
        </header>

        {post.cover_image_url && (
          <div className="aspect-[21/9] w-full overflow-hidden rounded-md mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {post.body ? (
            // Body is stored as HTML from Tiptap
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          ) : (
            <p className="text-slate-500">{post.excerpt || 'No content yet.'}</p>
          )}
        </div>
      </article>
    </div>
  )
}

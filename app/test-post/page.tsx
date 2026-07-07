import { getDummyPost } from '@/lib/sanity/client'

export default async function TestPostPage() {
  let post = null;
  let error = null;

  try {
    post = await getDummyPost();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="section-padding max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-heading">Test Post Route</h1>
      
      {error && (
        <div className="p-4 bg-red-100 text-red-900 rounded-md mb-8">
          <h2 className="font-bold">Error fetching from Sanity</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">Have you created a Sanity project and added your project ID to .env.local?</p>
        </div>
      )}

      {post ? (
        <article className="p-8 bg-soft rounded-md shadow-sm">
          <h2 className="text-3xl font-serif text-heading mb-4">{post.title}</h2>
          <div className="flex gap-4 text-sm font-sans mb-6">
            <span className="px-2 py-1 bg-accent-primary text-white rounded-sm">{post.arm}</span>
            <span className="px-2 py-1 bg-accent-gold text-white rounded-sm">{post.type}</span>
          </div>
          <p className="text-body font-sans">{post.excerpt}</p>
        </article>
      ) : (
        !error && <p>No posts found. You may need to seed a dummy post first.</p>
      )}
    </div>
  )
}

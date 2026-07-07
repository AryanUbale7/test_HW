import React from 'react';
import { getPosts } from '@/lib/sanity/queries';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticleListItem } from '@/components/sections/ArticleListItem';
import { ArticleFilters } from '@/components/sections/ArticleFilters';
import { Pagination } from '@/components/ui/Pagination';

export default async function HomePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const arm = typeof searchParams.arm === 'string' ? searchParams.arm : undefined;
  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  
  const limit = 9;

  const { posts, total } = await getPosts({ page, limit, arm, type });

  return (
    <div className="bg-ivory min-h-screen">
      <IntroStrip />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Posts Feed */}
        <div className="w-full lg:w-2/3">
          <ArticleFilters basePath="/" />

          {posts && posts.length > 0 ? (
            <div className="flex flex-col mt-4">
              {posts.map((post: any) => (
                <ArticleListItem 
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  category={post.arm || 'General'}
                  href={`/articles/${post.slug}`}
                  thumbnailUrl={post.thumbnailUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg font-sans text-charcoal">No articles found matching your criteria.</p>
            </div>
          )}

          <Pagination 
            currentPage={page} 
            totalItems={total} 
            itemsPerPage={limit} 
            basePath="/"
          />
        </div>

        {/* Right Column: Sidebar */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-10">
          {/* Author / "Start Here" Widget */}
          <div className="bg-sage-mist/20 border border-sage/20 p-8 rounded-sm">
            <h3 className="text-xl font-serif text-deep-green mb-4">About Honworth</h3>
            <p className="text-sm font-sans text-charcoal/80 mb-6 leading-relaxed">
              We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal on wealth creation, protection, and legacy.
            </p>
            <a href="/how-i-work" className="inline-block bg-deep-green text-ivory px-6 py-2 rounded-sm text-sm font-medium hover:bg-gold transition-colors w-full text-center">
              Work With Us
            </a>
          </div>

          {/* Newsletter Widget */}
          <div className="bg-deep-green text-ivory p-8 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full blur-2xl opacity-10 transform translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-xl font-serif mb-4 relative z-10">Join Our Inner Circle</h3>
            <p className="text-sm font-sans text-ivory/80 mb-6 relative z-10">
              Get actionable wealth architecture insights delivered directly to your inbox.
            </p>
            <form className="flex flex-col gap-3 relative z-10">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-ivory text-charcoal px-4 py-2 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button type="submit" className="bg-gold text-ivory font-medium px-4 py-2 rounded-sm text-sm hover:bg-white hover:text-deep-green transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </aside>

      </main>
    </div>
  );
}

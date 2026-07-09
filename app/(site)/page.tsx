import React from 'react';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { formatDate } from '@/lib/utils/formatDate';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticleListItem } from '@/components/sections/ArticleListItem';
import { ArticleFilters } from '@/components/sections/ArticleFilters';
import { Pagination } from '@/components/ui/Pagination';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Honworth | Wealth Creation, Protection & Legacy Planning',
  description: 'We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal.',
  alternates: {
    canonical: 'https://honworth.in',
  },
};

export default async function HomePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const arm = typeof searchParams.arm === 'string' ? searchParams.arm : undefined;
  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  
  const limit = 9;

  const { posts, total } = await getPosts({ page, limit, arm, type });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Honworth",
    "url": "https://honworth.in",
    "description": "We help high-net-worth families, professionals, and business owners architect robust financial strategies."
  };

  return (
    <div className="bg-ivory min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <h1 className="sr-only">Honworth | Wealth Creation, Protection & Legacy Planning</h1>
      <IntroStrip />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Posts Feed */}
        <div className="w-full lg:w-2/3">
          <ArticleFilters basePath="/" searchParams={searchParams} />

          {posts && posts.length > 0 ? (
            <div className="flex flex-col mt-4">
              {posts.map((post: any) => (
                <ArticleListItem 
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={formatDate(post.publishedAt)}
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
            searchParams={searchParams}
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
          <SidebarNewsletter />
        </aside>

      </main>
    </div>
  );
}

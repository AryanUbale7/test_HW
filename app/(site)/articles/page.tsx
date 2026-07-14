import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticlesFeed } from '@/components/sections/ArticlesFeed';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Articles & Insights | Honworth',
  description: 'Explore our latest insights, economy commentary, and behavioral finance articles on wealth creation, protection, and legacy planning.',
  alternates: {
    canonical: 'https://honworth.in/articles',
  },
};

export default async function ArticlesPage() {
  // Fetch up to 100 posts to cover all articles for instant client-side filtering
  const { posts } = await getPosts({ limit: 100 });

  return (
    <div className="bg-ivory min-h-screen">
      <h1 className="sr-only">Articles and Insights | Honworth</h1>
      <IntroStrip />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-8 md:pb-16">
        
        {/* Posts Feed */}
        <div className="w-full">
          <Suspense fallback={<div className="h-64 flex items-center justify-center font-sans text-charcoal/50">Loading articles...</div>}>
            <ArticlesFeed 
              initialPosts={posts || []} 
              basePath="/articles" 
            />
          </Suspense>
        </div>

      </main>
    </div>
  );
}

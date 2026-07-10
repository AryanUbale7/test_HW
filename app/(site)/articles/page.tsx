import React from 'react';
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Posts Feed */}
        <div className="w-full lg:w-2/3">
          <ArticlesFeed 
            initialPosts={posts || []} 
            basePath="/articles" 
          />
        </div>

        {/* Right Column: Sidebar */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-10">
          {/* Author / "Start Here" Widget */}
          <div className="bg-sage-mist/20 border border-sage/20 p-8 rounded-sm">
            <h2 className="text-xl font-serif text-deep-green mb-4">About Honworth</h2>
            <p className="text-sm font-sans text-charcoal/80 mb-6 leading-relaxed">
              We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal on wealth creation, protection, and legacy.
            </p>
            <Link href="/how-i-work" className="inline-block bg-deep-green text-ivory px-6 py-2 rounded-sm text-sm font-medium hover:bg-gold transition-colors w-full text-center">
              Work With Us
            </Link>
          </div>

          {/* Newsletter Widget */}
          <SidebarNewsletter />
        </aside>

      </main>
    </div>
  );
}

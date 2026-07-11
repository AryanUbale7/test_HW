import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticlesFeed } from '@/components/sections/ArticlesFeed';
import { SidebarNewsletter } from '@/components/sections/SidebarNewsletter';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Honworth | Wealth Creation, Protection & Legacy Planning',
  description: 'We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal.',
  alternates: {
    canonical: 'https://honworth.in',
  },
};

export default async function HomePage() {
  // Fetch up to 100 posts to cover all articles for instant client-side filtering
  const { posts } = await getPosts({ limit: 100 });

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

      <main id="articles" className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16 scroll-mt-32">
        <Suspense fallback={<div className="h-64 flex items-center justify-center font-sans text-charcoal/50">Loading articles...</div>}>
          <ArticlesFeed 
            initialPosts={posts || []} 
            basePath="/" 
          />
        </Suspense>
      </main>
    </div>
  );
}

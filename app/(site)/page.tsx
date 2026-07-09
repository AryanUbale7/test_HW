import React from 'react';
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

export default async function HomePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  
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

      <main id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16 scroll-mt-32">
        
        {/* Left Column: Posts Feed */}
        <div className="w-full lg:w-2/3">
          <ArticlesFeed 
            initialPosts={posts || []} 
            basePath="/" 
            initialSearchParams={searchParams} 
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

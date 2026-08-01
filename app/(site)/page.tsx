import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticlesFeed } from '@/components/sections/ArticlesFeed';
import { KnowledgeHubTeaser } from '@/components/sections/KnowledgeHubTeaser';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Honworth | Wealth Building, Protection & Legacy Planning',
  description: 'We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal.',
  alternates: {
    canonical: 'https://honworth.in',
  },
  openGraph: {
    title: 'Honworth | Wealth Building, Protection & Legacy Planning',
    description: 'We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal.',
    url: 'https://honworth.in',
    siteName: 'Honworth',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honworth | Wealth Building, Protection & Legacy Planning',
    description: 'We help high-net-worth families, professionals, and business owners architect robust financial strategies. Welcome to our journal.',
  },
};

export default async function HomePage() {
  // Fetch up to 100 posts to cover all articles for instant client-side filtering
  const { posts } = await getPosts({ limit: 100 });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://honworth.in/#website",
        "name": "Honworth",
        "url": "https://honworth.in",
        "description": "We help high-net-worth families, professionals, and business owners architect robust financial strategies."
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://honworth.in/#service",
        "name": "Honworth",
        "url": "https://honworth.in",
        "image": "https://honworth.in/logo.png",
        "description": "Bespoke wealth management, risk protection, and legacy structuring for high-net-worth families.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <div className="bg-ivory min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <h1 className="sr-only">Honworth | Wealth Building, Protection & Legacy Planning</h1>
      <IntroStrip />

      <div id="articles" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-12 md:py-16 scroll-mt-32">
        {/* Explore By Topic Teaser */}
        <KnowledgeHubTeaser />

        {/* Articles Feed */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center font-sans text-charcoal/50">Loading articles...</div>}>
          <ArticlesFeed 
            initialPosts={posts || []} 
            basePath="/" 
          />
        </Suspense>
      </div>
    </div>
  );
}

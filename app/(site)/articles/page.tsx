import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticlesFeed } from '@/components/sections/ArticlesFeed';
import { KnowledgeHubTeaser } from '@/components/sections/KnowledgeHubTeaser';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Articles & Insights | Honworth',
  description: 'Explore our latest insights, economy commentary, and behavioral finance articles on wealth creation, protection, and legacy planning.',
  alternates: {
    canonical: 'https://honworth.in/articles',
  },
  openGraph: {
    title: 'Articles & Insights | Honworth',
    description: 'Explore our latest insights, economy commentary, and behavioral finance articles on wealth creation, protection, and legacy planning.',
    url: 'https://honworth.in/articles',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles & Insights | Honworth',
    description: 'Explore our latest insights, economy commentary, and behavioral finance articles on wealth creation, protection, and legacy planning.',
  },
};

export default async function ArticlesPage() {
  // Fetch up to 100 posts to cover all articles for instant client-side filtering
  const { posts } = await getPosts({ limit: 100 });

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://honworth.in/articles/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://honworth.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Articles & Insights",
            "item": "https://honworth.in/articles"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://honworth.in/articles/#collection",
        "url": "https://honworth.in/articles",
        "name": "Articles & Insights | Honworth",
        "description": "Explore our latest insights, economy commentary, and behavioral finance articles on wealth creation, protection, and legacy planning."
      }
    ]
  };

  return (
    <div className="bg-ivory min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h1 className="sr-only">Articles and Insights | Honworth</h1>
      <IntroStrip />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-12 md:pt-8 md:pb-16">
        {/* Posts Feed */}
        <div className="w-full">
          <Suspense fallback={<div className="h-64 flex items-center justify-center font-sans text-charcoal/50">Loading articles...</div>}>
            <ArticlesFeed 
              initialPosts={posts || []} 
              basePath="/articles" 
            />
          </Suspense>
        </div>

        {/* Knowledge Hub Teaser Section */}
        <KnowledgeHubTeaser />
      </div>
    </div>
  );
}

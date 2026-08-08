import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getPosts } from '@/lib/queries/posts';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { ArticlesFeed } from '@/components/sections/ArticlesFeed';
import { KnowledgeHubTeaser } from '@/components/sections/KnowledgeHubTeaser';
import { MOCK_ARTICLES } from '@/lib/data/mockArticles';

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

  // Use mock articles as fallback when DB is unavailable (local dev / preview)
  const displayPosts = (posts && posts.length > 0) ? posts : MOCK_ARTICLES;

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 md:pt-4 pb-12 md:pb-16">
        {/* Knowledge Hub Teaser Section */}
        <KnowledgeHubTeaser />

        {/* Posts Feed */}
        <div className="w-full">
          <Suspense fallback={<div className="h-64 flex items-center justify-center font-sans text-charcoal/50">Loading articles...</div>}>
            <ArticlesFeed 
              initialPosts={displayPosts} 
              basePath="/articles" 
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { KNOWLEDGE_PILLARS } from '@/lib/data/knowledgeHub';
import { KnowledgePillarCard } from '@/components/sections/KnowledgePillarCard';
import { IntroStrip } from '@/components/sections/IntroStrip';

export const metadata: Metadata = {
  title: 'Knowledge Hub | Honworth',
  description: 'Organised. Easy to explore. Built for every financial journey. Explore structured guides on mutual funds, PMS, SIF, estate planning, insurance, retirement, and tax saving.',
  alternates: {
    canonical: 'https://honworth.in/knowledge-hub',
  },
  openGraph: {
    title: 'Knowledge Hub | Honworth',
    description: 'Organised. Easy to explore. Built for every financial journey.',
    url: 'https://honworth.in/knowledge-hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge Hub | Honworth',
    description: 'Organised. Easy to explore. Built for every financial journey.',
  },
};

export default function KnowledgeHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://honworth.in/knowledge-hub/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://honworth.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Knowledge Hub',
            item: 'https://honworth.in/knowledge-hub',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://honworth.in/knowledge-hub/#collection',
        url: 'https://honworth.in/knowledge-hub',
        name: 'Knowledge Hub | Honworth',
        description: 'Organised. Easy to explore. Built for every financial journey.',
      },
    ],
  };

  return (
    <div className="bg-ivory min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IntroStrip />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-sans uppercase tracking-widest text-deep-green hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
            Structured Learning
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-4">
            Knowledge Hub
          </h1>
          <p className="text-lg md:text-xl font-sans text-charcoal/80 leading-relaxed font-normal">
            Organised. Easy to explore. Built for every financial journey.
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {KNOWLEDGE_PILLARS.map((pillar) => (
            <KnowledgePillarCard key={pillar.slug} pillar={pillar} />
          ))}
        </div>
      </main>
    </div>
  );
}

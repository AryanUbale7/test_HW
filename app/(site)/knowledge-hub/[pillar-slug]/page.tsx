import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { KNOWLEDGE_PILLARS, getKnowledgePillarBySlug } from '@/lib/data/knowledgeHub';
import { IntroStrip } from '@/components/sections/IntroStrip';
import { PillarTabsView } from '@/components/sections/PillarTabsView';
import { getMoneyConversationsMapping } from '@/lib/queries/posts';

interface PillarPageProps {
  params: Promise<{ 'pillar-slug': string }>;
}

export async function generateStaticParams() {
  return KNOWLEDGE_PILLARS.map((pillar) => ({
    'pillar-slug': pillar.slug,
  }));
}

export async function generateMetadata(props: PillarPageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params['pillar-slug'];
  const pillar = getKnowledgePillarBySlug(slug);

  if (!pillar) {
    return {
      title: 'Pillar Not Found | Honworth',
    };
  }

  return {
    title: `${pillar.number} · ${pillar.title} | Knowledge Hub | Honworth`,
    description: pillar.description,
    alternates: {
      canonical: `https://honworth.in/knowledge-hub/${pillar.slug}`,
    },
    openGraph: {
      title: `${pillar.number} · ${pillar.title} | Knowledge Hub | Honworth`,
      description: pillar.description,
      url: `https://honworth.in/knowledge-hub/${pillar.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pillar.number} · ${pillar.title} | Knowledge Hub | Honworth`,
      description: pillar.description,
    },
  };
}

export default async function KnowledgePillarSinglePage(props: PillarPageProps) {
  const params = await props.params;
  const slug = params['pillar-slug'];
  const pillar = getKnowledgePillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: pillar.title,
        item: `https://honworth.in/knowledge-hub/${pillar.slug}`,
      },
    ],
  };

  const conversationsMapping = await getMoneyConversationsMapping();

  return (
    <div className="bg-ivory min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IntroStrip />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm font-sans text-charcoal/70 flex-wrap">
            <li>
              <Link href="/" className="hover:text-deep-green transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sage" />
            </li>
            <li>
              <Link href="/knowledge-hub" className="hover:text-deep-green transition-colors">
                Knowledge Hub
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-sage" />
            </li>
            <li className="text-deep-green font-medium" aria-current="page">
              {pillar.title}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-xs font-sans uppercase tracking-widest text-deep-green hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Hub
          </Link>
        </div>

        {/* Tabbed Pillar Content View */}
        <PillarTabsView pillar={pillar} conversationsMapping={conversationsMapping} />

        {/* Footer Navigation CTA */}
        <div className="mt-16 pt-8 border-t border-sage/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-sm font-sans font-medium text-deep-green hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Explore Other Knowledge Pillars
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center text-sm font-sans font-medium text-gold hover:text-deep-green transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Latest Articles & Insights
          </Link>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, HelpCircle, Lightbulb, MessageSquareQuote } from 'lucide-react';
import { KNOWLEDGE_PILLARS, getKnowledgePillarBySlug } from '@/lib/data/knowledgeHub';
import { IntroStrip } from '@/components/sections/IntroStrip';

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

        {/* Pillar Header Banner matching brief wireframe */}
        <header className="mb-10 bg-deep-green text-ivory rounded-md p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-2 font-sans">
            {pillar.number || 'Pillar'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-ivory leading-tight mb-3">
            {pillar.title}
          </h1>
          <p className="text-sm sm:text-base font-sans text-ivory/85 leading-relaxed max-w-2xl">
            {pillar.description}
          </p>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 1: LEARN (The Pillar Brief) */}
        {/* ========================================================================= */}
        <section aria-labelledby="learn-heading" className="mb-10 bg-sage-mist/20 border border-sage/30 rounded-md p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold font-sans tracking-[0.2em] uppercase px-3 py-1 bg-deep-green text-ivory rounded-sm">
              LEARN
            </span>
            <span className="text-xs font-serif italic text-charcoal/70">
              The pillar brief — what this chapter of life is about
            </span>
          </div>
          <p className="text-base sm:text-lg font-sans text-charcoal/90 leading-relaxed font-normal">
            {pillar.learnBrief}
          </p>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: UNDERSTAND (Sub-topic concept explainers) */}
        {/* ========================================================================= */}
        <section aria-labelledby="understand-heading" className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-sage/30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-sans tracking-[0.2em] uppercase px-3 py-1 bg-deep-green text-ivory rounded-sm">
                UNDERSTAND
              </span>
              <h2 id="understand-heading" className="font-serif text-xl sm:text-2xl text-deep-green">
                Concept Explainers ({pillar.understandGuides.length})
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5">
            {pillar.understandGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-ivory border border-sage/30 rounded-md p-5 sm:p-6 hover:border-deep-green/50 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-sage-mist/50 border border-sage/30 flex items-center justify-center text-xs font-serif text-deep-green font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-deep-green mb-1.5 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/80 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: REFLECT — Money Conversations (Differentiator Section - Gold Room) */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="reflect-heading"
          className="mb-12 border-2 border-gold/40 bg-gold/5 rounded-lg p-6 sm:p-8 shadow-sm relative overflow-hidden"
        >
          {/* Accent Badge */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-gold/30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-sans tracking-[0.15em] uppercase px-3 py-1.5 bg-gold text-ivory rounded-sm shadow-xs flex items-center gap-1.5">
                <MessageSquareQuote className="w-4 h-4" />
                REFLECT — Money Conversations
              </span>
            </div>
            <span className="text-xs font-sans text-gold font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
              {pillar.moneyConversations.length} Questions
            </span>
          </div>

          <p className="text-sm sm:text-base font-sans text-charcoal/80 mb-6 italic">
            An index of key real-world questions — each links to its own short, shareable explainer page.
          </p>

          {/* 15 Questions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {pillar.moneyConversations.map((q, idx) => (
              <Link
                key={idx}
                href={`/articles?type=Money+Conversation`}
                className="group flex items-start gap-3 bg-ivory border border-gold/30 hover:border-gold p-4 rounded-md transition-all duration-200 hover:shadow-xs"
              >
                <span className="text-gold font-bold font-serif text-lg leading-none shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
                <span className="text-sm font-serif font-medium text-deep-green group-hover:text-gold transition-colors leading-snug">
                  {q.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gold/20 text-center">
            <Link
              href="/articles?type=Money+Conversation"
              className="inline-flex items-center text-xs sm:text-sm font-sans font-bold text-gold hover:text-deep-green uppercase tracking-wider transition-colors"
            >
              <span>Explore All Money Conversations</span>
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </section>

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

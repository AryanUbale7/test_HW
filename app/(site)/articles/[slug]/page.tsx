import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getPostBySlug, getRelatedPosts } from '@/lib/queries/posts';
import { getGlossaryTermsList } from '@/lib/queries/glossary';
import { autoLinkGlossary } from '@/lib/utils/autoLinkGlossary';
import { generateTocAndInjectIds } from '@/lib/utils/toc';
import { formatDate } from '@/lib/utils/formatDate';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabaseAdmin
    .from('posts')
    .select('slug')
    .eq('status', 'published');
  return (data || []).map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Honworth`,
    description: post.excerpt.substring(0, 155),
    alternates: {
      canonical: `https://honworth.in/articles/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Honworth`,
      description: post.excerpt,
      url: `https://honworth.in/articles/${post.slug}`,
      images: post.thumbnailUrl ? [{ url: post.thumbnailUrl }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Honworth`,
      description: post.excerpt,
      images: post.thumbnailUrl ? [post.thumbnailUrl] : [],
    },
  };
}

export default async function SingleArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts and glossary terms in parallel (not sequentially)
  const [relatedPosts, glossaryTermsList] = await Promise.all([
    getRelatedPosts(post.slug, post.arm),
    getGlossaryTermsList(),
  ]);
  const autoLinkedBody = post.body ? autoLinkGlossary(post.body, glossaryTermsList) : '';
  const { html: processedBody, headings } = generateTocAndInjectIds(autoLinkedBody);

  const armUrls: Record<string, { href: string; label: string }> = {
    Creation: { href: '/wealth-creation', label: 'Wealth Creation' },
    Protection: { href: '/wealth-protection', label: 'Wealth Protection' },
    Legacy: { href: '/wealth-legacy', label: 'Wealth Legacy' },
  };
  const armInfo = post.arm ? armUrls[post.arm] : null;

  const categoryColors: Record<string, string> = {
    Creation: 'bg-sage-mist text-deep-green border-sage',
    Protection: 'bg-ivory text-gold border-gold/30',
    Legacy: 'bg-deep-green text-ivory border-deep-green',
    General: 'bg-transparent text-charcoal border-sage',
  };
  const catColor = categoryColors[post.arm || 'General'] || categoryColors.General;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": "Articles",
        "item": "https://honworth.in/articles"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://honworth.in/articles/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.thumbnailUrl || 'https://honworth.in/opengraph-image.png',
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": post.author ? {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": "Principal Advisor"
    } : {
      "@type": "Organization",
      "name": "Honworth"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Honworth",
      "logo": {
        "@type": "ImageObject",
        "url": "https://honworth.in/logo/main_logo.png"
      }
    }
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Dynamic JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 pb-4 md:pb-6">
        
        {/* Header */}
        <header className="mb-6 md:mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex justify-center items-center gap-4 text-sm font-sans text-charcoal">
            <time>
              {post.publishedAt ? formatDate(post.publishedAt, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'}
            </time>
          </div>
          
          {post.type === 'News' && post.sourceUrl && (
            <div className="mt-4 text-sm font-sans text-charcoal/70">
              Source: <a href={post.sourceUrl} className="underline hover:text-gold" target="_blank" rel="noopener noreferrer">{new URL(post.sourceUrl).hostname}</a>
            </div>
          )}
        </header>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="aspect-[21/9] w-full overflow-hidden bg-sage-mist rounded-md mb-8 md:mb-12 relative">
            <Image 
              src={post.thumbnailUrl} 
              alt={post.title} 
              fill 
              sizes="(max-width: 768px) 480px, 800px" 
              quality={80}
              className="object-cover" 
              priority 
            />
          </div>
        )}

        {/* Entity/Compliance Banner for Guide Articles */}
        {post.type === 'Guide' && (
          <div className="mb-10 p-5 bg-sage-mist/30 border border-sage/20 rounded-sm text-sm font-sans text-charcoal/80 leading-relaxed italic">
            <strong>Stewardship Statement:</strong> Honworth is an AMFI-registered Mutual Fund Distributor based in India, working with families across Wealth Creation, Protection, and Legacy planning. This guide is educational and does not constitute financial or legal advice.
          </div>
        )}

        {/* Table of Contents for Guides */}
        {post.type === 'Guide' && headings.length > 0 && (
          <nav className="mb-12 p-6 bg-sage-mist/10 border border-sage/20 rounded-sm" aria-label="Table of Contents">
            <h2 className="font-serif text-lg text-deep-green font-semibold mb-4 uppercase tracking-wider text-xs">Table of Contents</h2>
            <ul className="space-y-2.5 font-sans text-sm text-charcoal/90">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="hover:text-gold transition-colors underline underline-offset-4 decoration-sage/30 hover:decoration-gold">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Body Content */}
        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <div dangerouslySetInnerHTML={{ __html: processedBody }} />
          ) : (
            <p className="text-charcoal font-sans text-lg">{post.excerpt}</p>
          )}
        </div>

        {/* Author Byline */}
        {post.author && (
          <div className="mt-6 pt-6 border-t border-sage/30 flex gap-4 items-start">
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-sage/20 shadow-sm">
              <Image 
                src="/profile.png" 
                alt={post.author.name} 
                fill 
                sizes="64px" 
                className="object-cover object-top" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-deep-green leading-snug">{post.author.name} — Founder, Honworth</h3>
              <p className="font-sans text-sm text-charcoal leading-relaxed mt-1.5">{post.author.bio}</p>
              {post.author.credentials && post.author.credentials.length > 0 && (
                <p className="text-xs text-charcoal/80 mt-2.5 font-sans">
                  {post.author.credentials.join(' · ')}
                </p>
              )}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts Strip */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-sage-mist border-y border-sage/30 pt-6 pb-12 md:pt-8 md:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif text-deep-green mb-8 md:mb-12 text-center">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel: any) => (
                <ArticleCard 
                  key={rel.slug}
                  title={rel.title}
                  excerpt={rel.excerpt}
                  date={formatDate(rel.publishedAt, { year: 'numeric', month: 'long', day: 'numeric' })}
                  category={rel.arm || 'General'}
                  href={`/articles/${rel.slug}`}
                  thumbnailUrl={rel.thumbnailUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

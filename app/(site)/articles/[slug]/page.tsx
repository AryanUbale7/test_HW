import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getPostBySlug, getRelatedPosts } from '@/lib/queries/posts';
import { getGlossaryTermsList } from '@/lib/queries/glossary';
import { autoLinkGlossary } from '@/lib/utils/autoLinkGlossary';
import { formatDate } from '@/lib/utils/formatDate';
import { ArticleCard } from '@/components/sections/ArticleCard';

export const revalidate = 60;

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

  const relatedPosts = await getRelatedPosts(post.slug, post.arm);
  const glossaryTermsList = await getGlossaryTermsList();
  const autoLinkedBody = post.body ? autoLinkGlossary(post.body, glossaryTermsList) : '';

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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm border ${catColor}`}>
              {post.arm}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm border border-sage text-charcoal">
              {post.type}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex justify-center items-center gap-4 text-sm font-sans text-charcoal">
            <time>
              {post.publishedAt ? formatDate(post.publishedAt, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'}
            </time>
            {post.author && (
              <>
                <span className="text-sage">|</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>

          {/* Credentials/E-E-A-T Strip (AI & E-E-A-T Discoverability) */}
          <div className="mt-6 py-2.5 px-4 bg-sage-mist/20 border border-sage/20 rounded-sm text-xs font-sans text-charcoal/80 inline-flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            <span className="font-semibold text-deep-green">Stewardship:</span>
            <span>{post.author ? post.author.name : 'Honworth Advisor'}</span>
            {post.author?.credentials && post.author.credentials.length > 0 && (
              <span className="text-charcoal/60">({post.author.credentials.join(', ')})</span>
            )}
            <span className="text-sage">|</span>
            <span>AMFI-registered Mutual Fund Distributor</span>
          </div>

          {armInfo && (
            <div className="mt-6">
              <Link href={armInfo.href} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-sage-mist/40 text-deep-green border border-sage/30 hover:border-gold hover:text-gold transition-colors text-xs font-sans font-medium uppercase tracking-wider rounded-sm">
                Related to: {armInfo.label} <span className="text-[10px]">→</span>
              </Link>
            </div>
          )}
          
          {post.type === 'News' && post.sourceUrl && (
            <div className="mt-4 text-sm font-sans text-charcoal/70">
              Source: <a href={post.sourceUrl} className="underline hover:text-gold" target="_blank" rel="noopener noreferrer">{new URL(post.sourceUrl).hostname}</a>
            </div>
          )}
        </header>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="aspect-[21/9] w-full overflow-hidden bg-sage-mist rounded-md mb-16 relative">
            <Image 
              src={post.thumbnailUrl} 
              alt={post.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 800px" 
              className="object-cover" 
              priority 
            />
          </div>
        )}

        {/* Body Content */}
        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <div dangerouslySetInnerHTML={{ __html: autoLinkedBody }} />
          ) : (
            <p className="text-charcoal font-sans text-lg">{post.excerpt}</p>
          )}
        </div>

        {/* Author Byline */}
        {post.author && (
          <div className="mt-16 pt-8 border-t border-sage/30 flex items-center gap-6">
            {post.author.photoUrl && (
              <div className="relative w-16 h-16 shrink-0">
                <Image 
                  src={post.author.photoUrl} 
                  alt={post.author.name} 
                  fill 
                  sizes="64px" 
                  className="rounded-full object-cover" 
                />
              </div>
            )}
            <div>
              <h4 className="font-serif text-lg text-deep-green">{post.author.name}</h4>
              <p className="font-sans text-sm text-charcoal">{post.author.bio}</p>
              {post.author.credentials && (
                <div className="flex gap-2 mt-2">
                  {post.author.credentials.map((cred: string) => (
                    <span key={cred} className="text-xs bg-sage-mist px-2 py-1 rounded-sm text-charcoal">{cred}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts Strip */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-sage-mist border-y border-sage/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif text-deep-green mb-12 text-center">Related Insights</h2>
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

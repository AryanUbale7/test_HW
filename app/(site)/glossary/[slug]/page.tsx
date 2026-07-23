import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getGlossaryTermBySlug, getAllGlossaryTerms, getAllGlossarySlugs } from '@/lib/queries/glossary';
import { getPosts } from '@/lib/queries/posts';

export const revalidate = 60;

const ARM_PAGE: Record<string, { href: string; label: string }> = {
  Creation: { href: '/wealth-creation', label: 'Wealth Building' },
  Protection: { href: '/wealth-protection', label: 'Wealth Protection' },
  Legacy: { href: '/wealth-legacy', label: 'Wealth Legacy' },
  General: { href: '/how-i-work', label: 'How I Work' },
};

export async function generateStaticParams() {
  const terms = await getAllGlossarySlugs();
  return terms.map(t => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const term = await getGlossaryTermBySlug(slug);
  if (!term) return {};
  return {
    title: `${term.term} | Honworth Glossary`,
    description: term.short_definition.substring(0, 160),
    alternates: {
      canonical: `https://honworth.in/glossary/${term.slug}`,
    },
    openGraph: {
      title: `${term.term} | Honworth Glossary`,
      description: term.short_definition,
      url: `https://honworth.in/glossary/${term.slug}`,
      type: 'article',
    },
  };
}

export default async function GlossaryTermPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const term = await getGlossaryTermBySlug(slug);
  if (!term) notFound();

  // Fetch related terms and matching posts concurrently
  const [allTerms, postsResult] = await Promise.all([
    getAllGlossaryTerms(),
    term.arm && term.arm !== 'General' ? getPosts({ limit: 3, arm: term.arm }) : Promise.resolve({ posts: [] }),
  ]);

  let relatedTerms: { term: string; slug: string; short_definition: string }[] = [];
  const slugs = term.related_term_slugs || [];
  if (slugs.length) {
    relatedTerms = allTerms
      .filter(t => slugs.includes(t.slug))
      .map(t => ({ term: t.term, slug: t.slug, short_definition: t.short_definition }));
  }

  const relatedPosts = postsResult?.posts || [];
  const armPage = ARM_PAGE[term.arm || 'General'] || ARM_PAGE.General;

  // JSON-LD schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honworth.in' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://honworth.in/glossary' },
      { '@type': 'ListItem', position: 3, name: term.term, item: `https://honworth.in/glossary/${term.slug}` },
    ],
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.short_definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Honworth Financial Glossary',
      url: 'https://honworth.in/glossary',
    },
    url: `https://honworth.in/glossary/${term.slug}`,
  };

  return (
    <div className="bg-ivory min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-charcoal/80 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-gold transition-colors">Glossary</Link>
          <span>/</span>
          <span className="text-charcoal/80">{term.term}</span>
        </nav>

        {/* Arm Badge */}
        {term.arm && (
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm border border-sage text-charcoal/70">
              {term.arm === 'Creation' ? 'Building' : term.arm}
            </span>
          </div>
        )}

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-8">
          {term.term}
        </h1>

        {/* Short Definition — direct-answer format for AEO */}
        <div className="border-l-4 border-gold pl-6 mb-10">
          <p className="text-lg md:text-xl font-sans text-charcoal leading-relaxed">
            {term.short_definition}
          </p>
        </div>

        {/* Full Explanation */}
        {term.full_explanation && (
          <div className="prose prose-lg max-w-none font-sans text-charcoal/85 leading-relaxed mb-14">
            <h2 className="font-serif text-2xl text-deep-green mb-4">In More Detail</h2>
            <div dangerouslySetInnerHTML={{ __html: term.full_explanation }} />
          </div>
        )}

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mb-14" aria-label="Related terms">
            <h2 className="font-serif text-2xl text-deep-green mb-6">Related Terms</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTerms.map(rt => (
                <Link
                  key={rt.slug}
                  href={`/glossary/${rt.slug}`}
                  className="group block border border-sage/30 rounded-sm p-4 hover:border-gold/50 hover:bg-white/70 transition-all duration-200"
                  aria-label={`Read definition of ${rt.term}`}
                >
                  <p className="font-serif text-deep-green group-hover:text-gold transition-colors font-medium mb-1">
                    {rt.term}
                  </p>
                  <p className="text-xs font-sans text-charcoal/80 line-clamp-2 leading-relaxed">
                    {rt.short_definition}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mb-14" aria-label="Related articles">
            <h2 className="font-serif text-2xl text-deep-green mb-6">Recent Articles in {term.arm === 'Creation' ? 'Building' : term.arm}</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/articles/${post.slug}`}
                  className="group flex flex-col"
                  aria-label={`Read article: ${post.title}`}
                >
                  {post.thumbnailUrl && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-sage-mist rounded-sm mb-3 relative">
                      <Image 
                        src={post.thumbnailUrl} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 640px) 480px, (max-width: 1024px) 33vw, 250px"
                        quality={80}
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  )}
                  <p className="font-serif text-charcoal group-hover:text-gold transition-colors font-medium leading-snug line-clamp-2">
                    {post.title}
                  </p>
                  <span className="text-[10px] text-gold uppercase tracking-wider font-sans font-medium mt-2 inline-flex items-center gap-1">
                    Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Arm CTA */}
        <div className="bg-sage-mist/30 border border-sage/20 rounded-sm p-8 mb-8 text-center">
          <p className="font-sans text-sm text-charcoal/80 mb-2 tracking-wide uppercase text-xs">
            Explore further
          </p>
          <h3 className="font-serif text-xl text-deep-green mb-4">
            {term.arm === 'Creation' && 'Build wealth through disciplined, structured investing.'}
            {term.arm === 'Protection' && 'Protect what matters most with the right coverage.'}
            {term.arm === 'Legacy' && 'Ensure your wealth reaches the right hands.'}
            {(!term.arm || term.arm === 'General') && 'Understand how Honworth works with you.'}
          </h3>
          <Link
            href={armPage.href}
            className="inline-block bg-deep-green text-ivory font-sans text-sm font-medium px-6 py-3 rounded-sm hover:bg-gold transition-colors duration-300"
          >
            {armPage.label} →
          </Link>
        </div>

        {/* Start a Conversation CTA */}
        <div className="text-center">
          <p className="font-sans text-charcoal/60 text-sm mb-3">Have a question about this term?</p>
          <Link
            href="/reach-me"
            className="inline-block border border-deep-green text-deep-green font-sans text-sm font-medium px-6 py-3 rounded-sm hover:bg-deep-green hover:text-ivory transition-colors duration-300"
          >
            Start a conversation →
          </Link>
        </div>

      </article>
    </div>
  );
}

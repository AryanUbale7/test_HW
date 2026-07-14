import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { CtaBlock } from '@/components/sections/CtaBlock';

interface ArmPageTemplateProps {
  heading: string;
  philosophyText: string;
  offeringDescription: string;
  disclaimerText: string;
  ctaText?: string;
  author?: {
    name: string;
    credentials?: string[];
  } | null;
  posts?: any[];
  glossaryTerms?: any[];
}

export const ArmPageTemplate: React.FC<ArmPageTemplateProps> = ({
  heading,
  philosophyText,
  offeringDescription,
  disclaimerText,
  ctaText = "Start a Conversation",
  author,
  posts = [],
  glossaryTerms = [],
}) => {
  return (
    <div className="bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-6 md:pb-8">
        <SectionHeader 
          eyebrow="How I Work"
          heading={heading}
          className="mb-8"
          headingTag="h1"
        />

        {/* Advisor/Credibility Block (E-E-A-T & AI Discoverability) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-6 mb-12 bg-sage-mist/20 border border-sage/20 rounded-sm text-sm font-sans text-charcoal/80">
          <div className="font-semibold text-deep-green">Stewardship by:</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <span>{author?.name || 'Honworth Principal Advisor'}</span>
            {author?.credentials && author.credentials.length > 0 ? (
              author.credentials.map((cred) => (
                <React.Fragment key={cred}>
                  <span className="text-sage">|</span>
                  <span>{cred}</span>
                </React.Fragment>
              ))
            ) : (
              <>
                <span className="text-sage">|</span>
                <span>AMFI-registered Mutual Fund Distributor</span>
                <span className="text-sage">|</span>
                <span>NISM &amp; IRDAI Certified</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-16">
          {/* Philosophy Section */}
          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-6">Our Philosophy</h2>
            <div className="font-sans text-charcoal leading-relaxed space-y-4">
              {philosophyText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Offering Section */}
          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-6">The Offering</h2>
            <div className="font-sans text-charcoal leading-relaxed space-y-4">
              {offeringDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Disclaimer Callout */}
          <Card className="mt-12 bg-sage-mist/50">
            <h2 className="text-lg font-serif text-deep-green mb-3">Important Disclosure</h2>
            <p className="font-sans text-sm text-charcoal leading-relaxed">
              {disclaimerText}
            </p>
          </Card>

          {/* Topic Cluster: Related Glossary & Articles */}
          {(glossaryTerms.length > 0 || posts.length > 0) && (
            <section className="pt-12 border-t border-sage/20 space-y-12">
              {glossaryTerms.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif text-deep-green mb-6">Key Financial Terms</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {glossaryTerms.map((term) => (
                      <Link 
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="p-4 bg-white border border-sage/20 rounded-sm hover:border-gold transition-colors flex flex-col justify-between group"
                        aria-label={`Read definition of ${term.term}`}
                      >
                        <div>
                          <h3 className="font-serif text-deep-green group-hover:text-gold transition-colors font-semibold">{term.term}</h3>
                          <p className="text-xs text-charcoal/70 mt-2 line-clamp-2">{term.short_definition}</p>
                        </div>
                        <span className="text-[10px] text-gold uppercase tracking-wider font-sans font-medium mt-4 inline-flex items-center gap-1">
                          Read Definition <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {posts.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif text-deep-green mb-6">Recent Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
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
                              sizes="(max-width: 640px) 480px, (max-width: 1024px) 33vw, 300px"
                              quality={80}
                              className="object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>
                        )}
                        <h3 className="font-serif text-charcoal group-hover:text-gold transition-colors leading-snug font-medium line-clamp-2">{post.title}</h3>
                        <span className="text-[10px] text-gold uppercase tracking-wider font-sans font-medium mt-2 inline-flex items-center gap-1">
                          Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <CtaBlock 
        eyebrow="Take the next step"
        heading={ctaText} 
      />
    </div>
  );
};

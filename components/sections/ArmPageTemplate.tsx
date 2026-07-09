import React from 'react';
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
}

export const ArmPageTemplate: React.FC<ArmPageTemplateProps> = ({
  heading,
  philosophyText,
  offeringDescription,
  disclaimerText,
  ctaText = "Start a Conversation",
  author,
}) => {
  return (
    <div className="bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
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
            <h3 className="text-2xl font-serif text-deep-green mb-6">Our Philosophy</h3>
            <div className="font-sans text-charcoal leading-relaxed space-y-4">
              {philosophyText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Offering Section */}
          <section>
            <h3 className="text-2xl font-serif text-deep-green mb-6">The Offering</h3>
            <div className="font-sans text-charcoal leading-relaxed space-y-4">
              {offeringDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Disclaimer Callout */}
          <Card className="mt-12 bg-sage-mist/50">
            <h4 className="text-lg font-serif text-deep-green mb-3">Important Disclosure</h4>
            <p className="font-sans text-sm text-charcoal leading-relaxed">
              {disclaimerText}
            </p>
          </Card>
        </div>
      </div>

      <CtaBlock 
        eyebrow="Take the next step"
        heading={ctaText} 
      />
    </div>
  );
};

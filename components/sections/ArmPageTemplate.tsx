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
}

export const ArmPageTemplate: React.FC<ArmPageTemplateProps> = ({
  heading,
  philosophyText,
  offeringDescription,
  disclaimerText,
  ctaText = "Start a Conversation",
}) => {
  return (
    <div className="bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <SectionHeader 
          eyebrow="How I Work"
          heading={heading}
          className="mb-16"
        />

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

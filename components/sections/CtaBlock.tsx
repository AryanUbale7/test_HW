import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

interface CtaBlockProps {
  eyebrow?: string;
  heading?: string;
  subtext?: string;
}

export const CtaBlock: React.FC<CtaBlockProps> = ({
  eyebrow = "Take the Next Step",
  heading = "Ready to start a conversation?",
  subtext = "Whether you're looking to create, protect, or plan the legacy of your wealth, we are here to provide tailored guidance."
}) => {
  return (
    <section className="bg-sage-mist border-y border-sage/30 py-12 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <SectionHeader 
          eyebrow={eyebrow}
          heading={heading}
          subtext={subtext}
          align="center"
          className="mb-10"
        />
        <Button href="/reach-me" variant="primary">
          Start a Conversation
        </Button>
      </div>
    </section>
  );
};

import React from 'react';
import { getResources, getFaqs } from '@/lib/supabase/queries';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResourceCard } from '@/components/sections/ResourceCard';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { NewsletterSignup } from '@/components/sections/NewsletterSignup';
import { SipCalculator } from '@/components/ui/SipCalculator';
import { LifeCoverEstimator } from '@/components/ui/LifeCoverEstimator';

export const revalidate = 60;

export default async function LibraryPage() {
  const [resources, faqs] = await Promise.all([
    getResources(),
    getFaqs()
  ]);

  // Group FAQs by arm
  const groupedFaqs = faqs?.reduce((acc: any, faq: any) => {
    const arm = faq.arm || 'General';
    if (!acc[arm]) acc[arm] = [];
    acc[arm].push({
      id: faq._id,
      question: faq.question,
      answer: faq.answer
    });
    return acc;
  }, {}) || {};

  return (
    <div className="bg-ivory min-h-screen py-20">
      
      {/* Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <SectionHeader 
          eyebrow="The Library"
          heading="Exclusive resources and guides."
          subtext="In-depth materials designed to help you navigate complex wealth decisions with clarity."
          className="mb-16"
        />

        {resources && resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource: any) => (
              <ResourceCard 
                key={resource._id}
                id={resource._id}
                title={resource.title}
                description={resource.description}
                fileUrl={resource.fileUrl}
                gatedByEmail={resource.gatedByEmail}
              />
            ))}
          </div>
        ) : (
          <div className="bg-sage-mist border border-sage/30 rounded-md p-12 text-center">
            <p className="text-charcoal font-sans">No resources available at this time.</p>
          </div>
        )}
      </section>

      {/* Calculators Section */}
      <section className="bg-sage-mist border-y border-sage/30 py-32 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            eyebrow="Interactive Tools"
            heading="Estimate your requirements."
            subtext="Use these preliminary calculators to gauge your long-term wealth creation and protection needs."
            className="mb-16 text-center mx-auto"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <SipCalculator />
            <LifeCoverEstimator />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto">
        <NewsletterSignup />
      </div>

      {/* FAQ Section */}
      <section className="bg-sage-mist border-y border-sage/30 py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            heading="Frequently Asked Questions"
            align="center"
            className="mb-16"
          />

          {Object.keys(groupedFaqs).length > 0 ? (
            <div className="space-y-16">
              {Object.keys(groupedFaqs).map(arm => (
                <div key={arm}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-6 pb-2 border-b border-sage/50">{arm}</h3>
                  <FaqAccordion items={groupedFaqs[arm]} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-charcoal font-sans">No FAQs available at this time.</p>
          )}
        </div>
      </section>

    </div>
  );
}

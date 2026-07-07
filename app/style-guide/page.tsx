import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArmCard } from '@/components/sections/ArmCard';
import { ArticleCard } from '@/components/sections/ArticleCard';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { ContactForm } from '@/components/sections/ContactForm';
import { CtaBlock } from '@/components/sections/CtaBlock';

export default function StyleGuide() {
  const dummyFaqs = [
    {
      id: '1',
      question: 'What is your approach to wealth preservation?',
      answer: 'Our approach is rooted in risk mitigation and long-term stability. We assess your complete financial picture and build diversified structures that prioritize protecting what you have built.'
    },
    {
      id: '2',
      question: 'Do you provide direct tax advice?',
      answer: 'While we consider tax implications in all our strategies, Honworth does not provide direct tax advice. We coordinate seamlessly with your CPA or tax professional to ensure all strategies are tax-efficient.'
    },
    {
      id: '3',
      question: 'Who are your typical clients?',
      answer: 'We typically work with successful founders, executives, and multi-generational families who require comprehensive, discreet wealth stewardship.'
    }
  ];

  return (
    <div className="min-h-screen bg-ivory pb-20">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-serif text-deep-green mb-4">Style Guide & Components</h1>
        <p className="text-xl text-charcoal font-sans">A preview of all Honworth design system components.</p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Buttons */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Buttons</h2>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="tertiary">Tertiary Link</Button>
          </div>
        </section>

        {/* Section Header */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Section Header</h2>
          </div>
          <div className="bg-white p-8 rounded-md border border-sage/30">
            <SectionHeader 
              eyebrow="Our Philosophy"
              heading="Wealth is more than capital. It's the foundation of your legacy."
              subtext="We believe in a holistic approach to wealth stewardship, focusing on the preservation of your values alongside your assets."
            />
          </div>
        </section>

        {/* Base Card */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Base Card</h2>
          </div>
          <Card>
            <h3 className="text-2xl font-serif text-deep-green mb-4">Base Card Component</h3>
            <p className="text-charcoal font-sans leading-relaxed">
              This is the foundational Card component. It uses the sage-mist background and hairline sage border, ensuring a calm, premium feel without heavy drop shadows.
            </p>
          </Card>
        </section>

        {/* Arm Cards */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Arm Cards (Services)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArmCard 
              type="Creation" 
              description="Strategic growth strategies tailored to your risk tolerance and liquidity needs."
              href="#"
            />
            <ArmCard 
              type="Protection" 
              description="Robust defensive structuring to insulate your assets from unforeseen liabilities."
              href="#"
            />
            <ArmCard 
              type="Legacy" 
              description="Thoughtful succession planning to ensure smooth generational transitions."
              href="#"
            />
          </div>
        </section>

        {/* Article Cards */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Article Cards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard 
              title="The Shift in Generational Wealth Transfer"
              excerpt="An analysis of how emerging tax policies might impact your succession timelines over the next decade."
              date="October 12, 2026"
              category="Legacy"
              href="#"
              thumbnailUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            />
            <ArticleCard 
              title="Navigating Market Volatility"
              excerpt="Why steady hands and defensive positioning outperform reactive moves during uncertain economic climates."
              date="September 28, 2026"
              category="Protection"
              href="#"
            />
            <ArticleCard 
              title="Strategic Asset Allocation in 2027"
              excerpt="Looking ahead at structural shifts in global markets and how to position your portfolio for sustainable growth."
              date="September 15, 2026"
              category="Creation"
              href="#"
            />
          </div>
        </section>

        {/* FAQ Accordion */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">FAQ Accordion</h2>
          </div>
          <div className="bg-white p-8 rounded-md border border-sage/30">
            <FaqAccordion items={dummyFaqs} />
          </div>
        </section>

        {/* Testimonial */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Testimonial Card</h2>
            <p className="text-sm text-charcoal mt-2">Strictly compliant: quote, name/initial, and role only. No numeric ratings.</p>
          </div>
          <TestimonialCard 
            quote="Honworth brought clarity to a highly complex estate situation. Their discretion and systematic approach gave my family immense peace of mind."
            name="Sarah M."
            role="Third-Generation Family Business Owner"
          />
        </section>

        {/* Contact Form */}
        <section>
          <div className="mb-8 border-b border-sage/30 pb-4">
            <h2 className="text-2xl font-serif text-deep-green">Contact Form</h2>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-md border border-sage/30">
            <ContactForm />
          </div>
        </section>

      </main>

      {/* CTA Block */}
      <div className="mt-32 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 border-b border-sage/30 pb-4">
          <h2 className="text-2xl font-serif text-deep-green">CTA Block</h2>
        </div>
        <CtaBlock />
      </div>

      {/* Footer */}
      <div className="mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 border-b border-sage/30 pb-4">
          <h2 className="text-2xl font-serif text-deep-green">Footer</h2>
        </div>
        <Footer />
      </div>

    </div>
  );
}

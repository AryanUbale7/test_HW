import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { CtaBlock } from '@/components/sections/CtaBlock';

export const metadata: Metadata = {
  title: 'How I Work | Honworth',
  description: 'Our structured and transparent financial stewardship approach. Learn about engagement onboarding, distributor model compensation, and our three core pillars.',
  alternates: {
    canonical: 'https://honworth.in/how-i-work',
  },
};

export default function HowIWorkPage() {
  return (
    <div className="bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <SectionHeader 
          eyebrow="How I Work"
          heading="A structured, transparent approach to wealth stewardship."
          subtext="Clarity and alignment are the foundations of our relationship. Here is what you can expect when we partner together."
          className="mb-20 text-center mx-auto"
          align="center"
          headingTag="h1"
        />

        {/* Alternating Text Blocks */}
        <div className="space-y-24 mb-32">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span id="approach" className="scroll-mt-32 text-gold font-serif text-6xl opacity-50 block mb-4">01</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">My approach</h2>
              <p className="font-sans text-charcoal leading-relaxed">
                I prefer listening first. Before any discussion of funds or policies, I prefer to understand where a family is — their goals, their worries, what they're working towards, aspirations. Money decisions rarely rest with one person, so I prefer to work with the family as a whole, not just one member of it. The relationships I value most are the ones that grow over years. Understand first, advise second — that's the sequence I prefer.
              </p>
            </div>
            <div className="bg-sage-mist aspect-square rounded-md border border-sage/30 flex items-center justify-center p-12 text-center">
              <span className="text-deep-green/50 font-serif text-lg">[Visual Placeholder]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <span id="three-arms" className="scroll-mt-32 text-gold font-serif text-6xl opacity-50 block mb-4">02</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">The three arms</h2>
              <p className="font-sans text-charcoal leading-relaxed mb-4">
                My work spans three connected stages, and most families come to need all of them in time. 
              </p>
              <ul className="space-y-4 font-sans text-charcoal leading-relaxed list-disc list-outside ml-5">
                <li><strong>Wealth Creation</strong> is about building — helping your money grow steadily towards the goals that matter.</li>
                <li><strong>Wealth Protection</strong> is about safeguarding it — making sure the right cover is in place so one setback doesn't undo years of effort.</li>
                <li><strong>Wealth Legacy</strong> is about what comes after — thinking ahead to how wealth passes on within a family, cleanly and without confusion.</li>
              </ul>
              <p className="font-sans text-charcoal leading-relaxed mt-4">
                These aren't three separate services. They're three sides of one picture, and I look at them together.
              </p>
            </div>
            <div className="bg-sage-mist aspect-square rounded-md border border-sage/30 flex items-center justify-center p-12 text-center md:order-1">
              <span className="text-deep-green/50 font-serif text-lg">[Visual Placeholder]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span id="onboarding" className="scroll-mt-32 text-gold font-serif text-6xl opacity-50 block mb-4">03</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">How we begin</h2>
              <p className="font-sans text-charcoal leading-relaxed">
                No pressure, no jargon. We start with a conversation — your goals, your situation, where you stand today. From there we look at what you need across creation, protection, and legacy, and I walk you through suitable options in plain language, never rushing a decision. The paperwork and formalities I handle smoothly, so the process feels light. At every step, you'll know what's happening and why.
              </p>
            </div>
            <div className="bg-sage-mist aspect-square rounded-md border border-sage/30 flex items-center justify-center p-12 text-center">
              <span className="text-deep-green/50 font-serif text-lg">[Visual Placeholder]</span>
            </div>
          </div>

        </div>

        {/* How I'm Compensated - Card Callout */}
        <Card className="max-w-3xl mx-auto scroll-mt-32" id="compensation">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-8">How I'm compensated</h2>
          <div className="space-y-4 font-sans text-charcoal leading-relaxed mb-10">
            <p>
              I believe in being open about this, since few people like to ask. For mutual funds and SIF products, I'm compensated through the products themselves — the asset management companies pay a trail commission from the scheme's expense ratio, which doesn't add to your cost, and I charge no separate fee for my guidance. 
            </p>
            <p>
              Portfolio Management Services work differently, PMS carries its own fee structure — management and other charges set out in the provider's disclosure document — which I'll always walk you through upfront. Either way, you'll know exactly what you're paying, and why, before you decide.
            </p>
          </div>
          
          <h2 id="do-and-dont" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-8 scroll-mt-32 border-t border-sage/20 pt-10">What I do — and don't — do</h2>
          <div className="space-y-4 font-sans text-charcoal leading-relaxed">
            <p>
              I educate before I suggest. I work across all three arms, I stay available for the long haul, and I keep things simple. 
            </p>
            <p>
              What I don't do matters just as much — I don't push products for the sake of it, I don't promise or chase quick returns, and I won't suggest anything you can't explain back to me. I distribute and guide — I'm not a registered investment adviser, and I'll always be clear about that line.
            </p>
          </div>
        </Card>
      </div>

      <CtaBlock />
    </div>
  );
}

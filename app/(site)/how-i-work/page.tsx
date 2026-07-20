import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaBlock } from '@/components/sections/CtaBlock';

export const metadata: Metadata = {
  title: 'How I Work | Honworth',
  description: 'Our structured and transparent financial services approach. Learn about engagement onboarding, distributor model compensation, and our three core pillars.',
  alternates: {
    canonical: 'https://honworth.in/how-i-work',
  },
};

export default function HowIWorkPage() {
  return (
    <div className="bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-6 md:pb-8">
        <SectionHeader 
          eyebrow="How I Work"
          heading="A structured, transparent approach to your wealth journey"
          subtext="Built on clarity, thoughtful conversations, and a long-term perspective. Here's what you can expect when we work together"
          className="mb-20 text-center mx-auto"
          align="center"
          headingTag="h1"
        />

        {/* Alternating Text Blocks */}
        <div className="space-y-12 md:space-y-24 mb-16 md:mb-32">
          
          {/* Section 01: My Approach & Legacy Sub-section */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="approach" className="scroll-mt-32 text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8"><span className="text-gold mr-2">01-</span> My Approach</h2>
                <p className="font-sans text-charcoal leading-relaxed space-y-4">
                  <span>I believe people make better financial decisions when they understand how things work and why they matter.</span>
                  <br /><br />
                  <span>That's why every relationship begins with a conversation—not a recommendation.</span>
                  <br /><br />
                  <span>Before discussing investments or insurance, we take the time to build a clear understanding of the options available, how they work, and where they fit into your financial journey. Only then do we explore solutions that align with your goals, priorities, and stage of life.</span>
                  <br /><br />
                  <span>The same approach applies to insurance. The objective isn't to recommend the largest cover or the most complex solution, but to help you choose protection that's appropriate for your family's circumstances.</span>
                  <br /><br />
                  <span>Every recommendation should be easy to understand, have a clear purpose, and help you make decisions with confidence.</span>
                </p>
              </div>
              <div className="bg-sage-mist/40 aspect-square rounded-md border border-sage/30 flex items-center justify-center p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-sage/10 to-gold/5" />
                <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full border border-deep-green/30 flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center absolute -top-4 -left-4 bg-ivory/80 backdrop-blur-sm" />
                    <div className="w-12 h-12 rounded-full bg-deep-green/10 flex items-center justify-center">
                      <span className="text-deep-green font-serif text-lg">01</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-deep-green font-medium">Service First</p>
                    <p className="text-xs text-charcoal/70 mt-1 max-w-xs">Listening, understanding, and aligning before recommending.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Legacy Planning Matters to Me Section */}
            <div className="max-w-3xl border-t border-sage/20 pt-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-green mb-6">Why Legacy Planning Matters to Me:</h3>
              <div className="space-y-4 font-sans text-charcoal leading-relaxed">
                <p>
                  Over time, one aspect of financial planning began to stand out more than any other—legacy planning.
                </p>
                <p>
                  Conversations with professionals and time spent at industry forums made one thing increasingly clear: while many families work hard to build wealth, far fewer take the time to prepare for how it will be managed and passed on when the time comes.
                </p>
                <p>
                  That understanding became deeply personal after witnessing the experience of a close friend's family. Alongside the emotional loss they were coping with came the unexpected burden of sorting through financial and legal matters that had never been properly organised. It was a difficult reminder that the absence of a plan can place an unnecessary burden on the very people we hope to protect.
                </p>
                <p>
                  That experience deepened a belief I carry into every client relationship: planning ahead is one of the greatest acts of care we can leave behind.
                </p>
                <p>
                  To me, wealth management is about far more than growing wealth. It is about protecting it during your lifetime, ensuring it can be transferred smoothly, and helping preserve the values and purpose behind it for future generations.
                </p>
                <p>
                  Whether the conversation is about investments, insurance, or legacy planning, the objective remains the same—to bring clarity to important financial decisions, so you and your family can move forward with confidence.
                </p>
                <p>
                  Where specialised legal work such as wills, trusts, or estate documentation is required, I work alongside with trusted legal professionals for assistance and facilitation services in relation to succession and estate planning for clients.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <h2 id="three-arms" className="scroll-mt-32 text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8"><span className="text-gold mr-2">02-</span> The three Pillars (Offerings):</h2>
              <p className="font-sans text-charcoal leading-relaxed mb-6">
                My work spans three connected pillars, and most families come to need all of them in time.
              </p>
              
              <div className="space-y-6 font-sans text-charcoal leading-relaxed">
                <div className="border border-sage/30 p-6 rounded-sm bg-sage-mist/10 shadow-sm">
                  <h3 className="font-serif font-bold text-deep-green text-lg">Wealth Creation</h3>
                  <p className="text-sm mt-2">Helping your money work towards the goals that matter most.</p>
                </div>
                <div className="border border-sage/30 p-6 rounded-sm bg-sage-mist/10 shadow-sm">
                  <h3 className="font-serif font-bold text-deep-green text-lg">Wealth Protection</h3>
                  <p className="text-sm mt-2">Safeguarding what you've built—making sure the right cover is in place so that an unexpected event does not undo years of effort.</p>
                </div>
                <div className="border border-sage/30 p-6 rounded-sm bg-sage-mist/10 shadow-sm">
                  <h3 className="font-serif font-bold text-deep-green text-lg">Wealth Legacy</h3>
                  <p className="text-sm mt-2">Thinking ahead about how wealth passes on within a family, clearly, efficiently, and without unnecessary confusion.</p>
                </div>
              </div>

              <p className="font-sans text-charcoal leading-relaxed mt-6">
                These are not three separate services. They are three parts of one picture, and I believe they work best when viewed together.
              </p>
            </div>
            <div className="bg-sage-mist/40 aspect-square rounded-md border border-sage/30 flex items-center justify-center p-8 relative overflow-hidden group md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-sage/10 to-gold/5" />
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                <div className="flex gap-4 items-center justify-center">
                  <div className="w-12 h-12 rounded-sm border border-deep-green/20 flex flex-col items-center justify-center bg-white shadow-sm">
                    <span className="text-[10px] uppercase font-sans text-deep-green font-semibold">Build</span>
                  </div>
                  <div className="w-12 h-12 rounded-sm border border-gold/20 flex flex-col items-center justify-center bg-white shadow-sm">
                    <span className="text-[10px] uppercase font-sans text-gold font-semibold">Shield</span>
                  </div>
                  <div className="w-12 h-12 rounded-sm border border-deep-green/20 flex flex-col items-center justify-center bg-white shadow-sm">
                    <span className="text-[10px] uppercase font-sans text-deep-green font-semibold">Pass</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-serif text-deep-green font-medium">The Three Pillars</p>
                  <p className="text-xs text-charcoal/70 mt-1 max-w-xs">Three stages of one financial lifecycle.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="onboarding" className="scroll-mt-32 text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8"><span className="text-gold mr-2">03-</span> How I Engage:</h2>
              <p className="font-sans text-charcoal leading-relaxed space-y-4">
                <span>No pressure. No jargon. More thoughtful conversations.</span>
                <br /><br />
                <span>Every relationship begins with understanding where you are today—your goals, priorities, and the life you're working towards. From there, we explore what may be appropriate across wealth creation, wealth protection, and wealth legacy.</span>
                <br /><br />
                <span>The objective is simple: to help you make informed financial decisions through different stages of life and changing market conditions.</span>
                <br /><br />
                <span>Options are explained in plain language, and questions are always encouraged. Financial decisions should never feel rushed or confusing. Once you're comfortable moving forward, I take care of the paperwork and the process, leaving you free to focus on the decisions themselves.</span>
                <br /><br />
                <span>One important point worth knowing: your money is never held by me. Investments are made directly in your name with the respective Asset Management Companies and registrars. My role is to facilitate the process—not to receive or handle your funds.</span>
                <br /><br />
                <span>You'll always know what is being done, why it matters, and how it fits into your overall financial plan.</span>
                <br /><br />
                <span>Getting started is only the beginning.</span>
                <br /><br />
                <span>As life evolves, so should your financial plan. That's why we review your investments periodically—tracking progress towards your goals, reviewing asset allocation where appropriate, and ensuring your financial strategy continues to reflect your changing circumstances.</span>
              </p>
            </div>
            <div className="bg-sage-mist/40 aspect-square rounded-md border border-sage/30 flex items-center justify-center p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-sage/10 to-gold/5" />
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-md border border-sage/40 flex items-center justify-center bg-white/50 backdrop-blur-sm relative">
                  <div className="w-3 h-3 rounded-full bg-gold animate-pulse absolute -top-1 -right-1" />
                  <span className="text-2xl font-serif text-deep-green">🤝</span>
                </div>
                <div className="text-center">
                  <p className="font-serif text-deep-green font-medium">The Initial Conversation</p>
                  <p className="text-xs text-charcoal/70 mt-1 max-w-xs">A transparent roadmap starting with alignment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How I'm Compensated Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-16 border-t border-sage/20">
            <div className="md:col-span-2 max-w-3xl">
              <h2 id="compensation" className="scroll-mt-32 text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8"><span className="text-gold mr-2">04-</span> How I'm Compensated:</h2>
              <div className="space-y-4 font-sans text-charcoal leading-relaxed">
                <p>
                  Transparency is an important part of every client relationship. Before any investment or insurance decision is made, you'll have a clear understanding of how I'm compensated and what costs, if any, are involved.
                </p>
                <p>
                  For mutual funds and Specialised Investment Funds (SIF), I am compensated through a trail commission paid by the respective Asset Management Company from the scheme's expense ratio. You do not pay me a separate advisory fee for these services.
                </p>
                <p>
                  Portfolio Management Services (PMS) follow their own fee structure, as determined by the respective provider. Where applicable, these charges are explained upfront, so you understand both the costs and the services they relate to.
                </p>
                <p>
                  For insurance, the insurance company pays a commission when a policy is purchased through me. This commission forms part of the product structure and is governed by IRDAI regulations. There is no separate fee payable to me for arranging your cover.
                </p>
                <p>
                  Regardless of the product, the approach remains the same, costs are explained clearly, questions are always welcome, and recommendations should be understood before any decision is made.
                </p>
              </div>
            </div>
          </div>

          {/* What I Do - and Don't Do Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-16 border-t border-sage/20">
            <div className="md:col-span-2 max-w-3xl">
              <h2 id="do-and-dont" className="scroll-mt-32 text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8"><span className="text-gold mr-2">05-</span> What I Do—and Don't Do (Boundaries):</h2>
              <div className="space-y-4 font-sans text-charcoal leading-relaxed">
                <p>
                  Education comes before evaluation.
                </p>
                <p>
                  My role is to help individuals and families navigate three important aspects of their financial lives—building wealth, protecting it, and preparing it to be passed on with clarity and purpose. The focus is always on building long-term relationships and helping clients make informed financial decisions with confidence.
                </p>
                <p>
                  That also means being clear about what you can expect from me.
                </p>
                <p>
                  You'll never be encouraged to invest simply because a product is available or markets are fashionable. Suggestions are made only when they are appropriate for your circumstances, and only after you understand how they work and why they are being considered.
                </p>
                <p>
                  I also believe that no one should invest in something they cannot explain in their own words. Understanding should always come before action.
                </p>
                <p>
                  As an AMFI-registered Mutual Fund Distributor, my role is to facilitate investments and provide distribution-related guidance. I am not a SEBI-registered Investment Adviser (RIA), and that distinction will always be communicated clearly and transparently.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <CtaBlock />
    </div>
  );
}

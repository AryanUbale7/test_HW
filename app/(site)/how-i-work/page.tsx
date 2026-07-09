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
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">1. Your approach to working with families:</h2>
              <p className="font-sans text-charcoal leading-relaxed space-y-4">
                <span>I believe people make better financial decisions when they understand how things work and why they matter.</span>
                <br /><br />
                <span>So, we begin with the basics. We talk about how mutual funds, Portfolio management services, SIF (Specialised Investment funds) products work, how bonds can play a role in a portfolio, and how insurance can help protect a family's financial future. Only when that foundation is in place do we discuss solutions that align with a person's goals, priorities, and stage of life.</span>
                <br /><br />
                <span>The same philosophy applies to insurance. My focus is not on recommending the most expensive cover, but on helping people choose protection that is appropriate for their circumstances. Every recommendation should come with a clear explanation of its purpose and value.</span>
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
                  <p className="font-serif text-deep-green font-medium">Stewardship First</p>
                  <p className="text-xs text-charcoal/70 mt-1 max-w-xs">Listening, understanding, and aligning before recommending.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Legacy Planning Matters to Me Section */}
          <div className="max-w-3xl mx-auto border-t border-sage/20 pt-16">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-deep-green mb-6">Why Legacy Planning Matters to Me</h3>
            <div className="space-y-4 font-sans text-charcoal leading-relaxed">
              <p>
                Over the past few years, I have developed a deep interest in succession and wealth legacy planning. Through conversations with industry experts and time spent at financial forums, I came to appreciate how often families overlook this important aspect of financial well-being.
              </p>
              <p>
                That understanding became more personal when I reflected on a tragic experience involving a friend's family. The emotional loss was compounded by the challenges of untangling financial and legal matters that had never been properly organised or documented. It reinforced a simple but powerful lesson: planning ahead is one of the most valuable gifts we can leave for the people we care about.
              </p>
              <p>
                For me, wealth management is not just about creating wealth. It is equally about protecting it, transferring it smoothly, and ensuring that the values behind it endure across generations.
              </p>
              <p>
                Whether we are discussing investments, insurance, or legacy planning, my role is to bring clarity to important financial decisions—so that you can move forward with confidence and peace of mind.
              </p>
              <p>
                Where specialised legal work such as wills, trusts, or estate documentation is required, I work alongside with trusted legal professionals for assistance and facilitation services in relation to succession and estate planning for clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <span id="three-arms" className="scroll-mt-32 text-gold font-serif text-6xl opacity-50 block mb-4">02</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">2. The three Pillars (Offerings):</h2>
              <p className="font-sans text-charcoal leading-relaxed mb-6">
                My work spans three connected pillars, and most families come to need all of them in time.
              </p>
              <ul className="space-y-6 font-sans text-charcoal leading-relaxed">
                <li>
                  <h4 className="font-serif font-bold text-deep-green text-lg">Wealth Creation</h4>
                  <p className="text-sm mt-1">Helping your money grow steadily towards the goals that matter most.</p>
                </li>
                <li>
                  <h4 className="font-serif font-bold text-deep-green text-lg">Wealth Protection</h4>
                  <p className="text-sm mt-1">Safeguarding what you've built—making sure the right cover is in place so that an unexpected event does not undo years of effort.</p>
                </li>
                <li>
                  <h4 className="font-serif font-bold text-deep-green text-lg">Wealth Legacy</h4>
                  <p className="text-sm mt-1">Thinking ahead about how wealth passes on within a family, clearly, efficiently, and without unnecessary confusion.</p>
                </li>
              </ul>
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
                  <p className="font-serif text-deep-green font-medium">The Triad of Stewardship</p>
                  <p className="text-xs text-charcoal/70 mt-1 max-w-xs">Three stages of one financial lifecycle.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span id="onboarding" className="scroll-mt-32 text-gold font-serif text-6xl opacity-50 block mb-4">03</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-green mb-8">3. How you Engage:</h2>
              <p className="font-sans text-charcoal leading-relaxed space-y-4">
                <span>No pressure. No jargon.</span>
                <br /><br />
                <span>We start with a conversation—your goals, your circumstances, and where you stand today. From there, we explore what you may need across wealth creation, wealth protection, and wealth legacy.</span>
                <br /><br />
                <span>My role is to help families make sound financial decisions through changing market conditions and different stages of life.</span>
                <br /><br />
                <span>I explain options in plain language and encourage questions at every step. Decisions should be understood, not rushed. Once you're comfortable moving forward, I handle the paperwork and formalities so you can focus on the decisions that matter.</span>
                <br /><br />
                <span>One more thing worth knowing, your money never sits with me. All investments are made directly in your name with the respective asset management companies and registrars — I facilitate the process, but I never hold or handle your funds.</span>
                <br /><br />
                <span>Throughout the process, you'll know what's happening, why it's being done, and how it fits into your broader financial picture.</span>
                <br /><br />
                <span>Getting started is only the beginning.</span>
                <br /><br />
                <span>We'll review your investments together periodically—tracking progress against your goals, reviewing asset allocation, adjusting where appropriate, and ensuring your financial plan continues to reflect your changing life circumstances.</span>
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

        </div>

        {/* How I'm Compensated - Card Callout */}
        <Card className="max-w-3xl mx-auto scroll-mt-32 space-y-12" id="compensation">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-8">4. How I'm Compensated:</h2>
            <div className="space-y-4 font-sans text-charcoal leading-relaxed">
              <p>
                I believe compensation should never be a mystery, and I'm happy to explain how it works before any decision is made.
              </p>
              <p>
                For mutual funds and SIF products, I am compensated through the products themselves. Asset management companies pay a trail commission from the scheme's expense ratio, so you do not receive a separate bill from me, and I do not charge a separate fee for my services.
              </p>
              <p>
                Portfolio Management Services (PMS) have their own fee structure, including management and other charges outlined by the provider. I'll always explain these costs upfront so that you understand exactly what you're paying and why.
              </p>
              <p>
                For insurance, I am compensated through a commission paid by the insurance company when you buy a policy through me. This is built into the policy and set as per IRDAI regulations, so you do not pay me anything separately for arranging your cover.
              </p>
              <p>
                Transparency matters. Before you make any decision, you'll have a clear understanding of both the benefits and the costs involved.
              </p>
            </div>
          </div>
          
          <div id="do-and-dont" className="scroll-mt-32 border-t border-sage/20 pt-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-8">5. What I Do—and Don't Do (Boundaries)</h2>
            <div className="space-y-4 font-sans text-charcoal leading-relaxed">
              <p>
                I educate before I suggest.
              </p>
              <p>
                I work across wealth creation, wealth protection, and wealth legacy planning. I aim to build long-term relationships and help families make informed financial decisions they can stand behind.
              </p>
              <p>
                What I don't do matters just as much.
              </p>
              <p>
                I don't push products for the sake of it. I don't promise or chase quick returns. And I won't suggest anything that you cannot explain back to me in your own words.
              </p>
              <p>
                I work as a distributor and guide, not a Registered Investment Adviser, and I'll always be transparent about that distinction.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <CtaBlock />
    </div>
  );
}

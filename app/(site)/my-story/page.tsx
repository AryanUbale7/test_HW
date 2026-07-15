import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CtaBlock } from '@/components/sections/CtaBlock';

export const metadata: Metadata = {
  title: 'My Story | Honworth',
  description: 'Learn about the journey of Honworth, APEX financials transition, our core philosophy of Honour and Worth, and credentials as an AMFI registered distributor.',
  alternates: {
    canonical: 'https://honworth.in/my-story',
  },
};

export default function MyStoryPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://honworth.in/#organization",
        "name": "Honworth",
        "url": "https://honworth.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://honworth.in/logo/main_logo.png"
        }
      },
      {
        "@type": "Person",
        "@id": "https://honworth.in/#person",
        "name": "Rahul Karandikar",
        "jobTitle": "AMFI-registered Mutual Fund Distributor",
        "worksFor": {
          "@id": "https://honworth.in/#organization"
        },
        "image": "https://honworth.in/profile.png"
      }
    ]
  };

  return (
    <div className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 md:px-8 pt-10 md:pt-16 pb-6 md:pb-8">
        <div className="w-full">


          {/* Prose Blocks */}
          <div className="space-y-8 font-sans text-charcoal text-lg leading-relaxed max-w-3xl">
            <h2 id="journey" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mb-8 scroll-mt-32"><span className="text-[#DC8A2E] mr-2">01-</span> From IT to Personal Finance</h2>
            
            <p className="text-xl leading-relaxed font-serif text-deep-green/90">
              My journey into investing began in 2016, almost by accident.
            </p>
            <p>
              By then, I had spent close to two decades building a career in IT—a world of structure, analytical thinking, and disciplined processes. That year, at a family gathering, I reconnected with a close friend after many years. Our conversation drifted towards investing—not stock tips or market predictions, but the idea of building wealth by owning good businesses. I spent most of the discussion listening, fascinated by what I was hearing and quietly realising how little I understood about a subject that immediately caught my interest.
            </p>
            <p>
              Before we parted, he recommended a few books on investing. I ordered them the same week, eager to learn. Within a few days, I realised I had underestimated just how demanding the subject was, and the books found their way back onto the shelf.
            </p>
            <p>
              For a while.
            </p>
            <p>
              Curiosity, however, has a way of returning.
            </p>
            <p>
              A technical analysis course followed, along with countless evenings spent reading, studying businesses, and learning from experienced investors and market participants. Progress was gradual, but every step added another layer of understanding.
            </p>
            <p>
              The turning point came in 2019, when I found a mentor whose approach to investing resonated deeply with me. For the first time, I had a clear framework that brought structure to my learning and decision-making. Curiosity gradually became conviction. Investing was no longer just an interest—it had become something I genuinely wanted to pursue.
            </p>
            <p>
              Those early years taught me that successful investing is rarely about finding the next opportunity. More often, it is about patience, discipline, continuous learning, and staying focused on the long term when markets become noisy. That belief continues to shape the way I work with clients today.
            </p>

            <h2 id="leap" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8">The Decision</h2>
            <p>
              By 2025, after nearly two decades in the IT industry and almost a decade of studying and practising investing, the decision to pursue personal finance as a full-time profession felt like a natural next step.
            </p>
            <p>
              Leaving a long-established career was not an easy decision. It came with uncertainty, but also with the conviction that I could combine my passion for investing with meaningful work—helping individuals and families make better financial decisions. Throughout that transition, my family stood firmly behind me, giving me the confidence to take the leap.
            </p>
            <p>
              My years in technology shaped the way I think—structured, analytical, and disciplined. Those qualities continue to influence the way I approach financial planning and wealth management today.
            </p>
            <p>
              To strengthen my professional foundation, I completed AMFI — Mutual Fund Distributor Certification, Specialised Investment Funds (SIF) Distributor Certification & Portfolio management services (PMS) distribution from APMI, along with the IRDAI examination. These qualifications complement the practical experience gained over years of studying markets and continue to support the work I do with individuals and families.
            </p>

            <h2 id="philosophy" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-[#DC8A2E] mr-2">02-</span> How I Work (Philosophy)</h2>
            <h3 className="text-xl font-serif font-bold text-gold mb-4">Understanding Before Products.</h3>

            <p className="text-xl md:text-2xl font-serif font-bold text-deep-green/90 my-6">
              Listening comes first.
            </p>
            <p>
              Before discussing funds, insurance, or any financial product, it's important to understand where a family stands today—their goals, their concerns, and what they're working towards. Financial decisions rarely belong to one individual, which is why the focus is always on the family as a whole, not just one member.
            </p>
            <p>
              The most meaningful relationships are those that are built over years, not transactions.
            </p>
            <p className="text-xl leading-relaxed text-charcoal">
              There is one simple principle that guides every suggestion: <strong>never invest in something you cannot explain in your own words.</strong> If an investment isn't understood, it probably isn't the right investment.
            </p>

            <h2 id="meaning" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-[#DC8A2E] mr-2">03-</span> The Meaning Behind Honworth</h2>
            <p>
              Honworth brings together two timeless ideas: <strong>Honour</strong> and <strong>Worth</strong>.
            </p>
            <p className="text-xl md:text-2xl font-serif font-bold text-deep-green/90 my-6">
              Honour comes first.
            </p>
            <p>
              It stands for integrity, trust, and doing what is right for the families who place their confidence in me. Every relationship begins there.
            </p>
            <p>
              Worth goes beyond financial value. It speaks to wealth built with patience, cared for with responsibility, and preserved with purpose. It also carries an Old English meaning—a homestead or settlement, a place built to endure and passed from one generation to the next.
            </p>
            <p>
              That idea resonates deeply with me. True wealth is rarely measured only by what we accumulate, but by what we protect, preserve, and leave behind.
            </p>
            <p className="text-xl leading-relaxed text-charcoal">
              Together, these two ideas shape the philosophy behind Honworth: wealth should be built with integrity, protected with care, and passed on with purpose.
            </p>
            <p>
              More than a name, Honworth reflects the kind of practice I hope to build—one grounded in trust, dedicated to helping families make thoughtful financial decisions and create a legacy that endures.
            </p>

            <h2 id="credentials" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-[#DC8A2E] mr-2">04-</span> Credentials:</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col justify-between p-5 rounded-lg border border-sage/20 bg-white/50 shadow-sm hover:border-gold/30 hover:bg-white transition-all duration-300">
                <div>
                  <h3 className="font-serif font-bold text-deep-green text-base">Mutual Fund Distributor (MFD)</h3>
                  <p className="text-xs text-charcoal/60 font-sans mt-0.5">AMFI Registered Mutual Fund Distributor</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-sage-mist/60 text-gold font-mono font-bold px-3.5 py-1.5 rounded border border-sage/20 text-xs tracking-wider">
                    ARN-336150
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col justify-between p-5 rounded-lg border border-sage/20 bg-white/50 shadow-sm hover:border-gold/30 hover:bg-white transition-all duration-300">
                <div>
                  <h3 className="font-serif font-bold text-deep-green text-base">PMS Distributor</h3>
                  <p className="text-xs text-charcoal/60 font-sans mt-0.5">PMS Distributor Certification (APMI)</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-sage-mist/60 text-gold font-mono font-bold px-3.5 py-1.5 rounded border border-sage/20 text-xs tracking-wider">
                    APRN07678
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 rounded-lg border border-sage/20 bg-white/50 shadow-sm hover:border-gold/30 hover:bg-white transition-all duration-300">
                <div>
                  <h3 className="font-serif font-bold text-deep-green text-base">SIF Distributor</h3>
                  <p className="text-xs text-charcoal/60 font-sans mt-0.5">SIF Distributor Certification</p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-sage-mist/60 text-gold font-mono font-bold px-3.5 py-1.5 rounded border border-sage/20 text-xs tracking-wider">
                    ARN-336150
                  </span>
                </div>
              </div>
            </div>

            <h2 id="who-i-serve" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-[#DC8A2E] mr-2">05-</span> Whom I Serve</h2>
            <p>
              Over the time, I have realised that lasting financial relationships aren't defined by age, profession, or the size of a portfolio. They are built on a shared mindset.
            </p>
            <p>
              Some clients are just beginning their wealth-building journey. Others are planning for a child's education, buying a home, preparing for retirement, protecting what they've built, or thinking about the legacy they hope to leave behind.
            </p>
            <p>
              What connects them is a desire to make thoughtful financial decisions, build wealth steadily, and stay focused on long-term outcomes rather than short-term market noise.
            </p>
            <p>
              If you value clarity over complexity, discipline over speculation, and relationships built on trust, we'll likely work well together.
            </p>
          </div>
        </div>
      </article>

      <CtaBlock />
    </div>
  );
}

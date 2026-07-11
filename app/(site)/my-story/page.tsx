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
        "name": "Aryan Ubale",
        "jobTitle": "AMFI-registered Mutual Fund Distributor",
        "worksFor": {
          "@id": "https://honworth.in/#organization"
        },
        "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a"
      }
    ]
  };

  return (
    <div className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="w-full">
          <SectionHeader 
            eyebrow="My Story"
            heading="A decade of stewardship, guided discretion and discipline."
            className="mb-12"
            headingTag="h1"
          />

          {/* Credentials Badge Row */}
          <div className="flex flex-wrap gap-4 mb-16 border-y border-sage/30 py-6">
            <span className="inline-flex items-center px-4 py-2 bg-sage-mist text-deep-green font-sans text-sm font-medium rounded-sm">
              AMFI Registered Mutual Fund Distributor
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-sage-mist text-deep-green font-sans text-sm font-medium rounded-sm">
              NISM Certified
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-sage-mist text-deep-green font-sans text-sm font-medium rounded-sm">
              IRDAI Certified
            </span>
          </div>

          {/* Prose Blocks */}
          {/* Prose Blocks */}
        <div className="space-y-8 font-sans text-charcoal text-lg leading-relaxed max-w-3xl">
          <p>
            My journey into investing began in 2016, almost by accident.
          </p>
          <p>
            By then, I had spent close to two decades building a career in IT—a world of structure, analytical thinking, and disciplined processes. At a family gathering that year, I reconnected with a close friend after many years, and our conversation turned to equity investing—building wealth by owning a share in the growth of good businesses. I spent most of the discussion listening, fascinated by what I was hearing and quietly realising how little I understood about a subject that intrigued me deeply.
          </p>
          <p>
            Before we parted, he recommended a few books on investing. I ordered them the same week, eager to learn—and within days, the density of the material got the better of me. I set them aside. The journey, it turned out, would be longer than I expected. I later enrolled in a technical analysis course with a few friends and spent countless hours reading, studying businesses, following experienced investors and market participants. Progress was gradual, but each step deepened my understanding.
          </p>
          <p>
            The turning point came in 2019, when I found a mentor whose approach to investing resonated strongly with me. For the first time, I had a clear framework to guide my learning and decision-making. What began as curiosity gradually evolved into genuine interest, and eventually, a lasting passion for investing and wealth creation.
          </p>
          <p>
            Those early years taught me a lesson that continues to guide me today: successful investing is not built overnight. It requires patience, discipline, continuous learning, and the ability to stay focused on long-term outcomes rather than short-term noise. That philosophy remains at the heart of how I approach financial planning and investing.
          </p>

          <h2 id="leap" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8">The Leap</h2>
          <p>
            By 2025, after nearly 26 years in the IT industry and almost a decade of studying and practicing investing, I made the decision to pursue personal finance as a full-time profession.
          </p>
          <p>
            It was a significant transition, and leaving the comfort of a long-established career was not easy. I spent considerable time reflecting on the decision and preparing for the move. Throughout that period, my family and parents supported me wholeheartedly, giving me the confidence to take the next step. I felt strongly that I could combine my passion for investing with a meaningful opportunity to help individuals and families make better financial decisions.
          </p>
          <p>
            My background in technology had taught me the value of structured thinking, disciplined execution, and problem-solving—skills that translate naturally into financial planning and wealth management.
          </p>
          <p>
            To strengthen my professional foundation, I completed and cleared the AMFI Mutual Fund Distributor Certification, PMS and SIF Distributor Certifications, and the IRDAI examination, ensuring that my guidance and recommendations would be supported by both practical experience and professional credentials.
          </p>

          <h2 id="journey" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-gold mr-2">01-</span> From APEX Financials to Honworth</h2>
          <p>
            I began my practice as APEX Financials, initially focusing on mutual fund distribution. As I worked with more individuals and families, the scope of my work expanded beyond investments alone to include wealth protection and wealth legacy planning.
          </p>
          <p>
            Over time, I realised the name no longer reflected the broader purpose of the practice.
          </p>
          <p>
            That led to the creation of Honworth—a name built on two values I consider fundamental: honour and worth. It represents my belief that financial guidance should not merely help create wealth, but should do so with integrity, trust, and a long-term perspective.
          </p>
          <p>
            Today, Honworth reflects everything this journey has taught me—and an unwavering commitment to putting clients' interests first. I work with individuals and families who want a thoughtful, long-term approach to building, protecting, and preserving wealth, helping them make informed financial decisions with confidence and clarity.
          </p>

          <h2 id="philosophy" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-gold mr-2">02-</span> How I Work (Philosophy)</h2>
          <h3 className="text-xl font-serif font-bold text-gold mb-4">Understanding Before Products (***)</h3>
          <p>
            I listen first.
          </p>
          <p>
            Before any discussion of funds or policies, I want to understand where a family is—their goals, their worries, and what they're working towards. Money decisions rarely rest with one person, so I work with the family, not just one member of it. The relationships I value most are those that grow over years.
          </p>
          <p>
            I also have a simple rule: <strong>no one should invest in something they cannot explain back to me in their own words.</strong>
          </p>

          <h2 id="meaning" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-gold mr-2">03-</span> The Name (Identity) – Meaning of Honour + Worth</h2>
          <p>
            Honworth brings together two words: <strong>honour</strong> and <strong>worth</strong>.
          </p>
          <p>
            <strong>Honour</strong> comes first. It represents honesty, trust, and doing right by the families I work with. It is the foundation on which every client relationship is built.
          </p>
          <p>
            <strong>Worth</strong> speaks to value in its fullest sense—not just financial worth, but worthiness. It reflects wealth that is built thoughtfully, looked after carefully, and intended to endure. The word also carries an Old English meaning: a homestead or settlement—a place that lasts and is passed down through generations. That idea of creating something that outlasts us resonates deeply with me.
          </p>
          <p>
            Together, Honworth expresses a simple belief: <strong>wealth should be built with integrity, protected with care, and passed on with purpose.</strong>
          </p>
          <p>
            It is more than a name. It reflects the kind of practice I aspire to build—one founded on trust, helping families preserve what they have earned and create a legacy that endures.
          </p>

          <h2 id="credentials" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-gold mr-2">04-</span> Credentials:</h2>
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-sage/40">
                  <th className="py-3 font-serif font-bold text-deep-green text-base">Registration Type</th>
                  <th className="py-3 font-serif font-bold text-deep-green text-base">Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/20 text-charcoal/90">
                <tr>
                  <td className="py-4">Mutual Fund Distributor (MFD)</td>
                  <td className="py-4 font-mono">ARN-336150</td>
                </tr>
                <tr>
                  <td className="py-4">Portfolio Management Services (PMS)</td>
                  <td className="py-4 font-mono">APRN07678</td>
                </tr>
                <tr>
                  <td className="py-4">
                    Specialised Investment Fund (SIF)<br />
                    <span className="text-xs text-charcoal/60 italic">(specialised investment fund)</span>
                  </td>
                  <td className="py-4 font-mono">ARN-336150</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="who-i-serve" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-12 mb-8 scroll-mt-32 border-t border-sage/20 pt-8"><span className="text-gold mr-2">05-</span> Who I Serve: I work best with two kinds of people.</h2>
          <p>
            The first are young professionals and young families at the beginning of their wealth-building journey—when good financial habits, established early, can have the greatest impact over a lifetime.
          </p>
          <p>
            The second are individuals and families who want to bring structure and clarity to their financial lives. Whether it's planning for a child's education, buying a home, preparing for retirement, protecting their family's future, or thinking about the legacy they hope to leave behind, they value a thoughtful and disciplined approach to wealth.
          </p>
          <p>
            What connects them is not their age or income, but their mindset. They are looking to build steadily, make informed decisions, and protect what matters most—rather than chase the latest trend or the promise of quick returns.
          </p>
        </div>
      </div>
    </article>

      <CtaBlock />
    </div>
  );
}

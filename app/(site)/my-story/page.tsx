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
  return (
    <div className="bg-ivory">
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
            Every practice has a starting point. Mine began with a conversation I wasn't ready for.
          </p>
          
          <h2 id="journey" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-20 mb-8 scroll-mt-32 border-t border-sage/20 pt-12">From IT to personal finance</h2>
          <p>
            My understanding of equity investing began in 2016, almost by accident. At a family gathering, a close friend met after many years and he picked topic on Equity Investing. I spent most of the conversation listening — absorbing everything he said, while quietly realizing how little I actually understood about this topic, much intriguing.
          </p>
          <p>
            He suggested a few books. I bought them online the same week, full of enthusiasm. Within days the density of it became too much, and I kept them aside for a while. Later I took a technical analysis course with few friends. It was a new world again, but I still felt I was learning the wrong way, without a clear method. A year passed like this, and my progress was slower than I'd have liked. I kept at it anyway — watching interviews of well-known investors and traders, picking up a little at a time.
          </p>
          <p>
            The turning point came in 2019, when I found a good mentor and began following his approach to investing closely. Something finally clicked. The spark I'd been waiting for was there, and from that point my learning turned into genuine interest and passion.
          </p>
          <p>
            Those first three years of wrestling with the subject taught me something I still hold to. You cannot learn anything overnight — least of all investing. You have to give it your time and commitment, absorb it like a sponge, slow and steady. Investing game asks for patience; so does the experience of making your own mistakes and learning from them. That belief still shapes how I work today.
          </p>
          <p>
            In the year 2025, after nearly 26 years in my profession, my soul began quietly calling me to step out and pursue this as a practice. My heart was ready before my mind was — because this meant giving up a steady pay cheque. There were a few sleepless nights. But my family and my parents backed my decision willingly, and after a few weeks, heart and mind finally agreed. It was a heavy call to make. I was firm about it, and I made the move carefully and deliberately.
          </p>
          <p>
            The first few months were harder than I expected. Stepping out of a long career takes some getting used to — no laptop to open at a fixed hour, no meetings, no calls. I missed the rhythm of corporate life at first. But slowly the unease settled, and my focus shifted to what came next. Over five months, I studied for and cleared the AMFI Mutual Fund, PMS, SIF distributor certifications & IRDAI exams as well.
          </p>
          <p>
            I first ran my practice as APEX Financials, when I began with mutual fund distribution. As the work grew to include wealth creation, wealth protection, and wealth legacy, the old name no longer captured what I did — so I renamed it Honworth.
          </p>

          <h2 id="philosophy" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-20 mb-8 scroll-mt-32 border-t border-sage/20 pt-12">How I work</h2>
          <p>
            I have a simple rule: no one should invest in something they can't explain back to me.
          </p>
          <p>
            So when I meet someone who wants to start investing, or think about insurance, I avoid discussing the products. I begin with how things actually work — how mutual funds function, how bond investing works, and how the right insurance can protect a family when it matters most. Only once someone understands the ground they're standing on do we talk about what suits their goals and stage of life.
          </p>
          <p>
            The same care applies to insurance - not the most expensive cover, but the right kind for someone's age and circumstances, with an honest explanation of why it matters to them. 
          </p>
          <p>
            Over the past year, attending several financial events drew me deeper into something I'd underestimated — succession and wealth legacy planning. As I sat with the idea, I remembered a tragic incident involving a friend, and how much it cost their family to untangle matters afterwards, simply because nothing had been set down in advance. Late is better than never: it made me realise why succession deserves an open conversation within families, and why planning for legacy belongs alongside building and protecting wealth.
          </p>

          <h2 id="meaning" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-20 mb-8 scroll-mt-32 border-t border-sage/20 pt-12">The name</h2>
          <p>
            Honworth joins two words - honour and worth.
          </p>
          <p>
            Honour comes first — honesty, trust, and doing right by the families I work with. It's the foundation everything else rests on.
          </p>
          <p>
            Worth speaks to value in its fullest sense: not only financial worth, but worthiness — wealth that is looked after with care and meant to last. “Worth” also carries an old English meaning: a homestead, a place that endures and is passed down through generations. That sense of a lasting family estate is exactly what I want the name to hold.
          </p>
          <p>
            Together, the name means something simple — an honourable practice built on trust, helping families protect what they've earned and pass it on with dignity, across the generations.
          </p>

          <h2 id="credentials" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-20 mb-8 scroll-mt-32 border-t border-sage/20 pt-12">Credentials</h2>
          <p>
            AMFI-registered Mutual Fund Distributor (ARN–XXXXXX), AMFI-registered SIF Distributor, APMI-registered PMS Distributor.
          </p>

          <h2 id="who-i-serve" className="text-3xl md:text-4xl font-serif font-bold text-deep-green mt-20 mb-8 scroll-mt-32 border-t border-sage/20 pt-12">Who I work with</h2>
          <p>
            I work with two kinds of people especially well. The first are young professionals just stepping into their careers — the stage where good habits, started early, make the biggest difference over a lifetime. The second are families who want to bring order to their money around real life goals: a child's education, a home, kid’s marriage, a secure retirement, and what they hope to leave behind.
          </p>
          <p>
            What connects them is a wish to be thoughtful with money — to build steadily and protect what matters, rather than chase the next quick thing.
          </p>
        </div>
        </div>
      </article>

      <CtaBlock />
    </div>
  );
}

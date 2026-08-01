import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { KNOWLEDGE_PILLARS } from '@/lib/data/knowledgeHub';
import { KnowledgePillarCard } from './KnowledgePillarCard';

export const KnowledgeHubTeaser: React.FC = () => {
  // Showcase all 9 pillars or a primary subset
  const pillars = KNOWLEDGE_PILLARS.slice(0, 6);

  return (
    <section className="my-12 md:my-16 p-6 sm:p-10 bg-sage-mist/20 border border-sage/30 rounded-md">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-2">
            Structured Learning
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-deep-green">
            Explore by Topic
          </h2>
          <p className="text-sm sm:text-base font-sans text-charcoal/80 mt-1">
            Organised. Easy to explore. Built for every financial journey.
          </p>
        </div>

        <Link
          href="/knowledge-hub"
          className="inline-flex items-center text-sm font-sans font-medium text-deep-green hover:text-gold transition-colors shrink-0 group"
        >
          <span>See All Knowledge Pillars</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <KnowledgePillarCard key={pillar.slug} pillar={pillar} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/knowledge-hub"
          className="inline-flex items-center justify-center w-full py-3 px-6 text-sm font-sans font-medium bg-deep-green text-ivory hover:bg-gold hover:text-charcoal transition-colors rounded-md shadow-sm"
        >
          <span>See All Knowledge Pillars</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

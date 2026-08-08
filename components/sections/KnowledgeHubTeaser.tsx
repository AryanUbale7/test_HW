import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, ShieldCheck, Landmark, Wallet, LineChart } from 'lucide-react';

interface TopicCardItem {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const TOPIC_CARDS: TopicCardItem[] = [
  {
    slug: 'building-wealth',
    title: 'Building Wealth',
    description: 'Investing, compounding and creating long-term wealth.',
    icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/starting-your-investment-journey',
  },
  {
    slug: 'protection',
    title: 'Protection',
    description: 'Insurance, risk planning and safeguarding what matters.',
    icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/insurance-demystified',
  },
  {
    slug: 'legacy',
    title: 'Legacy',
    description: 'Wills, trusts and estate planning for your loved ones.',
    icon: <Landmark className="w-4 h-4 md:w-5 md:h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/estate-planning-legacy',
  },
  {
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Budgeting, saving, debt, taxes and smart money habits.',
    icon: <Wallet className="w-4 h-4 md:w-5 md:h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/personal-finance-foundations',
  },
  {
    slug: 'economy',
    title: 'Economy',
    description: 'Understanding the economy, markets and key trends.',
    icon: <LineChart className="w-4 h-4 md:w-5 md:h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/market-economy-basics',
  },
];

export const KnowledgeHubTeaser: React.FC = () => {
  return (
    <section className="w-full my-3 sm:my-4">
      {/* Container Box */}
      <div className="border border-sage/40 bg-sage-mist/10 rounded-md p-3.5 sm:p-5 md:p-6 text-center shadow-xs">
        
        {/* Header */}
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-serif text-deep-green font-bold uppercase tracking-widest mb-0.5 sm:mb-1">
          EXPLORE BY PILLAR
        </h2>
        
        {/* Accent ornament */}
        <div className="w-6 h-0.5 bg-gold/50 mx-auto mb-1.5 rounded-full" />
        
        <p className="text-[11px] sm:text-xs md:text-sm font-sans text-charcoal/80 leading-normal mb-3 md:mb-4 max-w-md mx-auto">
          In-depth guides to help you make better financial decisions at every stage of life.
        </p>

        {/* 3 cards on Mobile (grid-cols-3) & 5 cards on Desktop (lg:grid-cols-5) */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 mb-3 md:mb-4">
          {TOPIC_CARDS.map((card, idx) => (
            <Link
              key={card.slug}
              href={card.href}
              className={`group bg-ivory border border-sage/30 rounded-md p-2 sm:p-3 md:p-3.5 text-center hover:border-gold/60 hover:shadow-xs transition-all duration-200 flex-col items-center justify-start h-full ${
                idx >= 3 ? 'hidden lg:flex' : 'flex'
              }`}
            >
              {/* Icon Badge */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-sage-mist/40 border border-sage/20 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:bg-gold/10 group-hover:border-gold/40 transition-colors shrink-0">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-deep-green mb-1 leading-snug group-hover:text-gold transition-colors">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="font-sans text-[9px] sm:text-[10px] md:text-xs text-charcoal/75 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Center-aligned link button */}
        <div className="pt-2 border-t border-sage/20">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-[11px] sm:text-xs md:text-sm font-sans font-semibold text-deep-green hover:text-gold transition-colors group tracking-wider uppercase"
          >
            <span>View all pillar sections</span>
            <ArrowRight className="ml-1.5 w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

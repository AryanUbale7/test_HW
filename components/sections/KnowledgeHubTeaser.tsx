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
    icon: <TrendingUp className="w-3.5 h-3.5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/starting-your-investment-journey',
  },
  {
    slug: 'protection',
    title: 'Protection',
    description: 'Insurance, risk planning and safeguarding what matters.',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/insurance-demystified',
  },
  {
    slug: 'legacy',
    title: 'Legacy',
    description: 'Wills, trusts and estate planning for your loved ones.',
    icon: <Landmark className="w-3.5 h-3.5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/estate-planning-legacy',
  },
  {
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Budgeting, saving, debt, taxes and smart money habits.',
    icon: <Wallet className="w-3.5 h-3.5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/personal-finance-foundations',
  },
  {
    slug: 'economy',
    title: 'Economy',
    description: 'Understanding the economy, markets and key trends.',
    icon: <LineChart className="w-3.5 h-3.5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/market-economy-basics',
  },
];

export const KnowledgeHubTeaser: React.FC = () => {
  return (
    <section className="w-full my-2 sm:my-3">
      {/* Sleek Container Box */}
      <div className="border border-sage/40 bg-sage-mist/10 rounded-md p-3 sm:p-4 text-center shadow-xs">
        
        {/* Header */}
        <h2 className="text-xs sm:text-sm font-serif text-deep-green font-bold uppercase tracking-widest mb-0.5">
          EXPLORE BY TOPIC
        </h2>
        
        {/* Accent ornament */}
        <div className="w-5 h-0.5 bg-gold/50 mx-auto mb-1 rounded-full" />
        
        <p className="text-[11px] sm:text-xs font-sans text-charcoal/70 leading-normal mb-2.5 max-w-sm mx-auto">
          In-depth guides to help you make better financial decisions at every stage of life.
        </p>

        {/* 3 cards on Mobile (grid-cols-3) & 5 cards on Desktop (lg:grid-cols-5) */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2 mb-2.5">
          {TOPIC_CARDS.map((card, idx) => (
            <Link
              key={card.slug}
              href={card.href}
              className={`group bg-ivory border border-sage/30 rounded p-1.5 sm:p-2.5 text-center hover:border-gold/60 hover:shadow-xs transition-all duration-200 flex-col items-center justify-start h-full ${
                idx >= 3 ? 'hidden lg:flex' : 'flex'
              }`}
            >
              {/* Icon Badge */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sage-mist/40 border border-sage/20 flex items-center justify-center mb-1 group-hover:bg-gold/10 group-hover:border-gold/40 transition-colors shrink-0">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-[11px] sm:text-xs font-bold text-deep-green mb-0.5 leading-tight group-hover:text-gold transition-colors">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="font-sans text-[9px] sm:text-[10px] text-charcoal/70 leading-tight line-clamp-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Center-aligned link button */}
        <div className="pt-1.5 border-t border-sage/20">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-[11px] font-sans font-semibold text-deep-green hover:text-gold transition-colors group tracking-wider uppercase"
          >
            <span>View all pillar pages</span>
            <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

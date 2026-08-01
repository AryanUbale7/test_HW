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
    icon: <TrendingUp className="w-5 h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/mutual-funds-for-beginners',
  },
  {
    slug: 'protection',
    title: 'Protection',
    description: 'Insurance, risk planning and safeguarding what matters.',
    icon: <ShieldCheck className="w-5 h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/insurance-demystified',
  },
  {
    slug: 'legacy',
    title: 'Legacy',
    description: 'Wills, trusts and estate planning for your loved ones.',
    icon: <Landmark className="w-5 h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/estate-planning-legacy',
  },
  {
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Budgeting, saving, debt, taxes and smart money habits.',
    icon: <Wallet className="w-5 h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/personal-finance-foundations',
  },
  {
    slug: 'economy',
    title: 'Economy',
    description: 'Understanding the economy, markets and key trends.',
    icon: <LineChart className="w-5 h-5 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/market-economy-basics',
  },
];

export const KnowledgeHubTeaser: React.FC = () => {
  return (
    <section className="w-full mt-1 mb-6 sm:mb-8">
      {/* Balanced Medium Container Box */}
      <div className="border border-sage/40 bg-sage-mist/10 rounded-lg p-5 sm:p-6 md:p-7 text-center shadow-xs">
        
        {/* Header */}
        <h2 className="text-base sm:text-lg md:text-xl font-serif text-deep-green font-bold uppercase tracking-wider mb-1">
          EXPLORE BY TOPIC
        </h2>
        
        {/* Accent ornament */}
        <div className="w-7 h-0.5 bg-gold/50 mx-auto mb-2 rounded-full" />
        
        <p className="text-xs sm:text-sm font-sans text-charcoal/80 leading-relaxed mb-5 max-w-lg mx-auto">
          In-depth guides to help you make better financial decisions at every stage of life.
        </p>

        {/* 5 Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 mb-5">
          {TOPIC_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="group bg-ivory border border-sage/30 rounded-md p-3.5 sm:p-4 text-center hover:border-gold/60 hover:shadow-sm transition-all duration-200 flex flex-col items-center justify-start h-full"
            >
              {/* Icon Badge */}
              <div className="w-10 h-10 rounded-full bg-sage-mist/40 border border-sage/20 flex items-center justify-center mb-2.5 group-hover:bg-gold/10 group-hover:border-gold/40 transition-colors shrink-0">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-sm sm:text-base font-bold text-deep-green mb-1 leading-snug group-hover:text-gold transition-colors">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="font-sans text-xs text-charcoal/75 leading-relaxed flex-grow">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Center-aligned link button */}
        <div className="pt-2 border-t border-sage/20">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-xs sm:text-sm font-sans font-semibold text-deep-green hover:text-gold transition-colors group tracking-wide uppercase pt-1"
          >
            <span>View all pillar pages</span>
            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

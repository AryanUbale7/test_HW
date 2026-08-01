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
    icon: <TrendingUp className="w-6 h-6 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/mutual-funds-for-beginners',
  },
  {
    slug: 'protection',
    title: 'Protection',
    description: 'Insurance, risk planning and safeguarding what matters.',
    icon: <ShieldCheck className="w-6 h-6 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/insurance-demystified',
  },
  {
    slug: 'legacy',
    title: 'Legacy',
    description: 'Wills, trusts and estate planning for your loved ones.',
    icon: <Landmark className="w-6 h-6 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/estate-planning-legacy',
  },
  {
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Budgeting, saving, debt, taxes and smart money habits.',
    icon: <Wallet className="w-6 h-6 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/personal-finance-foundations',
  },
  {
    slug: 'economy',
    title: 'Economy',
    description: 'Understanding the economy, markets and key trends.',
    icon: <LineChart className="w-6 h-6 text-deep-green" strokeWidth={1.5} />,
    href: '/knowledge-hub/market-economy-basics',
  },
];

export const KnowledgeHubTeaser: React.FC = () => {
  return (
    <section className="w-full my-6 sm:my-8">
      {/* Outer Enclosing Container Box matching user wireframe */}
      <div className="border border-sage/40 bg-sage-mist/10 rounded-lg p-5 sm:p-7 md:p-8 text-center shadow-sm">
        
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-serif text-deep-green font-bold uppercase tracking-wider mb-1">
          EXPLORE BY TOPIC
        </h2>
        
        {/* Accent ornament */}
        <div className="w-8 h-0.5 bg-gold/50 mx-auto mb-2 rounded-full" />
        
        <p className="text-xs sm:text-sm font-sans text-charcoal/80 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto">
          In-depth guides to help you make better financial decisions at every stage of life.
        </p>

        {/* 5 Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {TOPIC_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="group bg-ivory/90 border border-sage/30 rounded-md p-4 sm:p-5 text-center hover:border-gold/60 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-start h-full"
            >
              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-full bg-sage-mist/40 border border-sage/20 flex items-center justify-center mb-3 group-hover:bg-gold/10 group-hover:border-gold/40 transition-colors shrink-0">
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-serif text-base sm:text-lg font-bold text-deep-green mb-1.5 leading-snug group-hover:text-gold transition-colors">
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
        <div className="pt-1 border-t border-sage/20">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-xs sm:text-sm font-sans font-medium text-deep-green hover:text-gold transition-colors group tracking-wide uppercase pt-2"
          >
            <span>View all pillar pages</span>
            <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

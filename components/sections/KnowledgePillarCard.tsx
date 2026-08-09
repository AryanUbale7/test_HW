import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, TrendingUp, Briefcase, Layers, Landmark, 
  ShieldCheck, Compass, Calculator, Wallet, LineChart,
  User, Sliders
} from 'lucide-react';
import { KnowledgePillar } from '@/lib/data/knowledgeHub';

const ICON_MAP: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Briefcase: <Briefcase className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Layers: <Layers className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Landmark: <Landmark className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Compass: <Compass className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Calculator: <Calculator className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Wallet: <Wallet className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  LineChart: <LineChart className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  User: <User className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  Sliders: <Sliders className="w-7 h-7 text-gold" strokeWidth={1.5} />,
};

interface KnowledgePillarCardProps {
  pillar: KnowledgePillar;
}

export const KnowledgePillarCard: React.FC<KnowledgePillarCardProps> = ({ pillar }) => {
  const icon = ICON_MAP[pillar.iconName] || <TrendingUp className="w-7 h-7 text-gold" strokeWidth={1.5} />;

  return (
    <Link
      href={`/knowledge-hub/${pillar.slug}`}
      className="group bg-ivory border border-sage/40 rounded-md p-6 sm:p-8 hover:border-sage hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="mb-5 bg-sage-mist/60 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-sage-mist transition-colors">
        {icon}
      </div>

      <h3 className="text-xl sm:text-2xl font-serif text-deep-green mb-2.5 group-hover:text-gold transition-colors leading-snug">
        {pillar.title}
      </h3>

      <p className="text-charcoal/80 font-sans text-sm sm:text-base leading-relaxed mb-6 flex-grow">
        {pillar.description}
      </p>

      <div className="inline-flex items-center text-sm font-sans font-medium text-deep-green group-hover:text-gold transition-colors mt-auto">
        <span>Explore Topics</span>
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

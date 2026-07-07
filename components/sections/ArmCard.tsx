'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Landmark } from 'lucide-react';

interface ArmCardProps {
  type: 'Creation' | 'Protection' | 'Legacy';
  description: string;
  href: string;
  delay?: number;
}

export const ArmCard: React.FC<ArmCardProps> = ({ type, description, href, delay = 0 }) => {
  const icons = {
    Creation: <TrendingUp className="w-8 h-8 text-gold" strokeWidth={1.5} />,
    Protection: <Shield className="w-8 h-8 text-gold" strokeWidth={1.5} />,
    Legacy: <Landmark className="w-8 h-8 text-gold" strokeWidth={1.5} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group bg-ivory border border-sage/50 rounded-md p-8 md:p-10 hover:border-sage transition-colors flex flex-col h-full"
    >
      <div className="mb-6 bg-sage-mist w-16 h-16 rounded-full flex items-center justify-center">
        {icons[type]}
      </div>
      
      <h3 className="text-2xl font-serif text-deep-green mb-3">
        Wealth {type}
      </h3>
      
      <p className="text-charcoal font-sans leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <Link 
        href={href} 
        className="inline-flex items-center text-deep-green font-sans font-medium group-hover:text-gold transition-colors mt-auto"
      >
        Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, role }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-sage-mist border border-sage rounded-md p-10 md:p-14 text-center max-w-4xl mx-auto"
    >
      <blockquote className="text-xl md:text-2xl font-serif text-deep-green leading-relaxed mb-8">
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      <div className="font-sans">
        <div className="font-semibold text-deep-green mb-1">{name}</div>
        <div className="text-sm text-charcoal">{role}</div>
      </div>
    </motion.div>
  );
};

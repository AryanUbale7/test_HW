'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        
        return (
          <div 
            key={item.id} 
            className="border-b border-sage/50 pb-4"
          >
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={isOpen ? `faq-answer-${item.id}` : undefined}
              className="w-full flex justify-between items-center text-left py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm group"
            >
              <span id={`faq-question-${item.id}`} className="text-lg md:text-xl font-serif text-deep-green group-hover:text-gold transition-colors pr-8">
                {item.question}
              </span>
              <span className="flex-shrink-0 text-deep-green">
                {isOpen ? (
                  <Minus className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-5 h-5" strokeWidth={1.5} />
                )}
              </span>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-charcoal font-sans leading-relaxed pb-4 pr-12">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

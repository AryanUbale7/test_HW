'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { KnowledgePillar } from '@/lib/data/knowledgeHub';

interface PillarTabsViewProps {
  pillar: KnowledgePillar;
}

export const PillarTabsView: React.FC<PillarTabsViewProps> = ({ pillar }) => {
  const [activeTab, setActiveTab] = useState<'conversations' | 'basics'>('conversations');

  return (
    <div className="w-full">
      {/* Pillar Header Card */}
      <header className="mb-8 bg-deep-green text-ivory rounded-md p-6 sm:p-8 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-ivory leading-tight mb-2">
          {pillar.number} · {pillar.title}
        </h1>
        <p className="text-xs sm:text-sm font-sans text-ivory/80 leading-relaxed font-normal">
          {pillar.description}
        </p>
      </header>

      {/* Tabs Bar */}
      <div className="flex border-b border-sage/30 mb-6 gap-6 sm:gap-8">
        <button
          onClick={() => setActiveTab('conversations')}
          className={`pb-3 text-sm sm:text-base font-sans font-semibold tracking-wide transition-all duration-200 relative ${
            activeTab === 'conversations'
              ? 'text-gold'
              : 'text-charcoal/60 hover:text-charcoal'
          }`}
        >
          Money Conversations
          {activeTab === 'conversations' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('basics')}
          className={`pb-3 text-sm sm:text-base font-sans font-semibold tracking-wide transition-all duration-200 relative ${
            activeTab === 'basics'
              ? 'text-gold'
              : 'text-charcoal/60 hover:text-charcoal'
          }`}
        >
          The Basics
          {activeTab === 'basics' && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[250px] transition-all duration-300">
        {activeTab === 'conversations' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs sm:text-sm font-sans text-charcoal/60 mb-6 italic">
              An index of ~{pillar.moneyConversations.length} questions — each links to its own short piece
            </p>

            {/* Questions List */}
            <div className="flex flex-col gap-4">
              {pillar.moneyConversations.map((q, idx) => (
                <Link
                  key={idx}
                  href={`/articles?type=Money+Conversation`}
                  className="group flex items-start gap-3 py-1.5 transition-all duration-200"
                >
                  <span className="text-gold font-bold font-serif text-base sm:text-lg leading-none shrink-0 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span className="text-sm sm:text-base font-serif font-medium text-deep-green group-hover:text-gold transition-colors leading-snug">
                    {q.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'basics' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
            {/* Learn Section */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-serif font-bold text-deep-green">
                Learn
              </h2>
              <p className="text-xs sm:text-sm font-sans italic text-charcoal/60">
                The pillar brief — what this chapter of life is about.
              </p>
              <p className="text-sm sm:text-base font-sans text-charcoal/90 leading-relaxed font-normal pt-1">
                {pillar.learnBrief}
              </p>
            </section>

            {/* Understand Section */}
            <section className="space-y-4 border-t border-sage/20 pt-6">
              <h2 className="text-base sm:text-lg font-serif font-bold text-deep-green">
                Understand — the concept guides
              </h2>

              <div className="flex flex-col gap-4">
                {pillar.understandGuides.map((guide, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-sage shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex-1">
                      <h3 className="font-serif text-sm sm:text-base font-bold text-deep-green leading-snug">
                        {guide.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-1">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

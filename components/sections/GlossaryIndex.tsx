'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { GlossaryTerm } from '@/types/glossary';

const ARM_COLORS: Record<string, string> = {
  Creation: 'bg-sage-mist text-deep-green border-sage',
  Protection: 'bg-ivory text-gold border-gold/30',
  Legacy: 'bg-deep-green text-ivory border-deep-green',
  General: 'bg-transparent text-charcoal border-sage',
};

export function GlossaryIndex({ terms }: { terms: GlossaryTerm[] }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return terms;
    return terms.filter(
      t =>
        t.term.toLowerCase().includes(q) ||
        t.short_definition.toLowerCase().includes(q)
    );
  }, [search, terms]);

  // Group filtered terms by first letter
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    }
    return map;
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="bg-ivory min-h-screen py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Reference
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-6">
            Financial Glossary
          </h1>
          <p className="text-lg font-sans text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Clear, plain-language definitions of the terms that matter most to your financial life — organised alphabetically, cross-linked, and free of jargon.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms…"
            className="w-full max-w-md mx-auto block bg-transparent border-b-2 border-sage py-3 px-1 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/40"
            aria-label="Search glossary terms"
          />
        </div>

        {/* Jump Nav — only show when not searching */}
        {!search && letters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center border border-sage text-deep-green text-sm font-semibold rounded-sm hover:bg-gold hover:text-ivory hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {letter}
              </a>
            ))}
          </div>
        )}

        {/* Term Groups */}
        {letters.length === 0 && (
          <p className="text-center text-charcoal/60 font-sans mt-12">
            No terms match &ldquo;{search}&rdquo;.
          </p>
        )}

        <div className="space-y-14">
          {letters.map(letter => (
            <section key={letter} id={`letter-${letter}`} aria-label={`Terms starting with ${letter}`}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-serif text-gold">{letter}</span>
                <div className="flex-1 h-px bg-sage/30" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {grouped[letter].map(term => {
                  const color = ARM_COLORS[term.arm || 'General'] || ARM_COLORS.General;
                  return (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="group block border border-sage/30 rounded-sm p-5 hover:border-gold/50 hover:shadow-md transition-all duration-200 bg-white/40 hover:bg-white/80"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h2 className="font-serif text-lg text-deep-green group-hover:text-gold transition-colors leading-snug">
                          {term.term}
                        </h2>
                        {term.arm && (
                          <span className={`shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm border ${color}`}>
                            {term.arm}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-sm text-charcoal/70 leading-relaxed line-clamp-2">
                        {term.short_definition}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}

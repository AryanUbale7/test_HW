import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LifeCoverEstimator } from '@/components/sections/LifeCoverEstimator';

export const metadata: Metadata = {
  title: 'Life Cover Estimator | Honworth',
  description: 'Free illustrative life cover estimator — get a rough sense of how much term insurance cover your family might need. Not personalised advice.',
  alternates: { canonical: 'https://honworth.in/calculators/life-cover' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Life Cover Estimator — Honworth',
  description: 'An illustrative life cover estimator based on general thumb-rules (Human Life Value approach). Not personalised financial advice and not a product recommendation.',
  url: 'https://honworth.in/calculators/life-cover',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function LifeCoverPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-charcoal/50 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/library" className="hover:text-gold transition-colors">Library</Link>
          <span>/</span>
          <span className="text-charcoal/80">Life Cover Estimator</span>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Calculators</p>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-5">
            Life Cover Estimator
          </h1>
          <p className="font-sans text-charcoal/80 text-lg leading-relaxed max-w-2xl">
            <Link href="/glossary/term-insurance" className="text-deep-green underline underline-offset-4 hover:text-gold transition-colors">
              Term insurance
            </Link>{' '}
            is the most cost-efficient way to protect your family's financial future. Use this tool to get a rough, illustrative sense of the cover range that families in similar situations often consider — based on your income, liabilities, and the number of years your dependents need support. For{' '}
            <Link href="/wealth-protection" className="text-deep-green underline underline-offset-4 hover:text-gold transition-colors">
              full protection planning
            </Link>
            , the numbers here are a starting point, not a final answer.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white/60 border border-sage/20 rounded-sm p-6 md:p-10 shadow-sm">
          <LifeCoverEstimator />
        </div>

        {/* Quiet CTA */}
        <div className="mt-10 text-center">
          <p className="font-sans text-charcoal/60 text-sm mb-3">
            Want help turning this into a real plan?
          </p>
          <Link
            href="/reach-me"
            className="inline-block border border-deep-green text-deep-green font-sans text-sm font-medium px-6 py-3 rounded-sm hover:bg-deep-green hover:text-ivory transition-colors duration-300"
          >
            Start a conversation →
          </Link>
        </div>

      </div>
    </div>
  );
}

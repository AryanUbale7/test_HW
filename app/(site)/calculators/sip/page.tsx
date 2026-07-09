import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SipCalculator } from '@/components/ui/SipCalculator';

export const metadata: Metadata = {
  title: 'SIP Calculator | Honworth',
  description: 'Free illustrative SIP calculator — estimate how a monthly investment could grow over time. Not a guarantee of returns.',
  alternates: { canonical: 'https://honworth.in/calculators/sip' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SIP Calculator — Honworth',
  description: 'An illustrative SIP (Systematic Investment Plan) calculator that estimates future value based on user-chosen inputs. Not a financial planning tool and not a guarantee of returns.',
  url: 'https://honworth.in/calculators/sip',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function SipCalculatorPage() {
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
          <span className="text-charcoal/80">SIP Calculator</span>
        </nav>

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Calculators</p>
          <h1 className="text-4xl md:text-5xl font-serif text-deep-green leading-tight mb-5">
            SIP Calculator
          </h1>
          <p className="font-sans text-charcoal/80 text-lg leading-relaxed max-w-2xl">
            A{' '}
            <Link href="/glossary/sip" className="text-deep-green underline underline-offset-4 hover:text-gold transition-colors">
              Systematic Investment Plan (SIP)
            </Link>{' '}
            lets you invest a fixed amount in a{' '}
            <Link href="/wealth-creation" className="text-deep-green underline underline-offset-4 hover:text-gold transition-colors">
              mutual fund
            </Link>{' '}
            at regular intervals — removing the need to time the market. Use this tool to explore how different monthly amounts, durations, and return assumptions affect the illustrative outcome over time.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white/60 border border-sage/20 rounded-sm p-6 md:p-10 shadow-sm">
          <SipCalculator />
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

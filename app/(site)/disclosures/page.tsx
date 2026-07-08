import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulatory Disclosures | Honworth',
  description: 'Read the regulatory disclosures, registration numbers (ARN), and commission structure details for Honworth.',
  alternates: {
    canonical: 'https://honworth.in/disclosures',
  },
};

export default function DisclosuresPage() {
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-serif text-deep-green mb-4">Regulatory Disclosures</h1>
        <p className="text-sm font-sans text-charcoal/70 mb-12">Last Updated: [DATE TBD]</p>

        {/* Legal Content */}
        <div className="space-y-12 font-sans text-charcoal leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">Registration Details</h2>
            <p>[LEGAL COPY TBD] Honworth operates as an AMFI-registered Mutual Fund Distributor with ARN-[PLACEHOLDER]. We act strictly in a distribution capacity for mutual funds and are compensated via commissions paid by Asset Management Companies (AMCs) on the products distributed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">Commission Structure</h2>
            <p>[LEGAL COPY TBD] In accordance with SEBI circulars, a detailed breakdown of the commission structure (upfront and trail) earned by us from various AMCs is available upon request. We distribute regular plans of mutual fund schemes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">Conflict of Interest</h2>
            <p>[LEGAL COPY TBD] While we strive to recommend products that align with your financial objectives, our remuneration from AMCs may present a conflict of interest. We urge investors to independently evaluate products before committing capital.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">Insurance & Other Products</h2>
            <p>[LEGAL COPY TBD] For insurance products, we are empanelled with specific insurers and act as corporate agents/brokers where applicable. Insurance is the subject matter of solicitation. All related commissions and fees will be disclosed prior to transaction execution.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

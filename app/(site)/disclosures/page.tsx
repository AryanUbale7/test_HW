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
  const currentMonthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-serif text-deep-green mb-4">Regulatory Disclosures</h1>
        <p className="text-sm font-sans text-charcoal/70 mb-12">Last Updated: {currentMonthYear}</p>

        {/* Legal Content */}
        <div className="space-y-12 font-sans text-charcoal leading-relaxed">
          <section id="numbers" className="scroll-mt-32">
            <h2 className="text-2xl font-serif text-deep-green mb-4">Registration & Empanelment Details</h2>
            <p>Honworth is a professional financial distribution firm operating under the following regulatory registrations:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
              <li><strong>AMFI Mutual Fund Distributor:</strong> ARN–{process.env.NEXT_PUBLIC_ARN_NUMBER || 'XXXXXX'}</li>
              <li><strong>SIF Empanelment:</strong> Empanelled Strategic Investment Fund Distributor</li>
              <li><strong>PMS Empanelment:</strong> Empanelled Portfolio Management Services Distributor</li>
            </ul>
          </section>

          <section id="disclaimer" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif text-deep-green mb-4">Distributor (Non-Advisory) Disclaimer</h2>
            <p>Honworth acts strictly in a distribution capacity. We are not a registered investment adviser (RIA) under SEBI, and we do not provide fee-based investment advice or comprehensive financial planning services. All materials, tools, calculators, and commentary shared on this site are purely for educational and distribution purposes.</p>
          </section>

          <section id="no-guarantee" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif text-deep-green mb-4">No Guaranteed-Returns Disclaimer</h2>
            <p>Mutual fund and securities investments are subject to market risks, and there is no assurance or guarantee that the objectives of any schemes will be achieved. Past performance is not indicative of future results. We make no representations or guarantees regarding future returns or capital safety.</p>
          </section>

          <section id="grievance" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif text-deep-green mb-4">Grievance Redressal & SCORES</h2>
            <p>For any service-related complaints, please reach out to us at <a href="mailto:grievance@honworth.in" className="text-gold hover:underline">grievance@honworth.in</a>. If the grievance is not resolved within 30 days, you can lodge a formal complaint on the SEBI SCORES portal at <a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">scores.sebi.gov.in</a>.</p>
          </section>

          <section id="privacy" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif text-deep-green mb-4">Privacy & Terms of Use Summary</h2>
            <p>We respect client privacy and confidentiality. Personal data collected through forms, newsletter signups, or calculators is processed solely for compliance, client communication, and service fulfillment in accordance with our <a href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Honworth',
  description: 'Read the informational, investment risk, and liability disclaimers for Honworth.',
  alternates: {
    canonical: 'https://honworth.in/disclaimer',
  },
};

export default function DisclaimerPage() {
  const currentMonthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-serif text-deep-green mb-4">Disclaimer</h1>
        <p className="text-sm font-sans text-charcoal/70 mb-12">Last Updated: {currentMonthYear}</p>

        {/* Legal Content */}
        <div className="space-y-12 font-sans text-charcoal leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">General Information</h2>
            <p>The information contained on this website is for general informational purposes only. It does not constitute investment, financial, legal, or tax advice. You should consult with a qualified professional regarding your specific circumstances before making any financial decisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">Investment Risks</h2>
            <p>Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Past performance of any scheme or product is not an indicator of future returns. The value of investments may go up or down based on market conditions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">No Liability</h2>
            <p>Honworth makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the information provided on this site. Under no circumstances shall Honworth be liable for any direct, indirect, special, or consequential damages arising from the use of this website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-deep-green mb-4">External Links</h2>
            <p>This website may contain links to external sites that are not operated by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

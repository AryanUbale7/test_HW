import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulatory Disclosures | Honworth',
  description: 'Read the regulatory disclosures, AMFI registration numbers (ARN), non-advisory disclaimers, risk disclosures, and grievance redressal for Honworth.',
  alternates: {
    canonical: 'https://honworth.in/disclosures',
  },
};

export default function DisclosuresPage() {
  const currentMonthYear = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  return (
    <div className="bg-ivory min-h-screen pt-10 md:pt-16 pb-20 md:pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-serif font-bold text-deep-green mb-4">Disclosures</h1>
        <p className="text-sm font-sans text-[#CBA32E] font-medium mb-12">Last Updated: {currentMonthYear}</p>

        {/* Legal Content */}
        <div className="space-y-12 font-sans text-charcoal leading-relaxed">
          
          <section id="arn" className="scroll-mt-32">
            <h2 className="text-2xl font-serif font-bold text-deep-green mb-4">ARN / SIFD / APRN numbers</h2>
            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse text-left font-sans text-sm">
                <thead>
                  <tr className="border-b border-sage/40">
                    <th className="py-3 font-serif font-bold text-deep-green text-base">Registration Type</th>
                    <th className="py-3 font-serif font-bold text-deep-green text-base">Number</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/20 text-charcoal/90">
                  <tr>
                    <td className="py-4">Mutual Fund Distributor (MFD)</td>
                    <td className="py-4 font-mono">ARN-336150</td>
                  </tr>
                  <tr>
                    <td className="py-4">Portfolio Management Services (PMS) Distributor</td>
                    <td className="py-4 font-mono">APRN07678</td>
                  </tr>
                  <tr>
                    <td className="py-4">Specialised Investment Fund (SIF) Distributor</td>
                    <td className="py-4 font-mono">ARN-336150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="distributor-disclaimer" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif font-bold text-deep-green mb-4">Distributor (non-advisory) disclaimer</h2>
            <p>
              Honworth acts solely as an AMFI-registered Mutual Fund Distributor (ARN:336150) and earns commission from Asset Management Companies for the distribution of Regular Plan mutual fund schemes. Honworth is not a SEBI Registered Investment Adviser and does not provide investment advice for a fee. All content on this website is for general education and awareness only and does not constitute investment advice or a recommendation to buy, sell or hold any security or scheme. Investors should make their own decisions and consult their own financial or tax advisers, or a SEBI Registered Investment Adviser, before investing.
            </p>
          </section>

          <section id="no-guarantee" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif font-bold text-deep-green mb-4">No guaranteed-returns disclaimer</h2>
            <div className="space-y-4">
              <p>
                Mutual fund investments do not offer guaranteed or assured returns. The value of investments and the income from them can go up or down depending on factors affecting the securities markets. Past performance is not indicative of future results. Nothing on this website should be construed as a promise, guarantee or forecast of any return.
              </p>
              <div className="bg-sage-mist/50 border-l-4 border-gold p-4 mt-4 italic font-medium">
                "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully."
              </div>
            </div>
          </section>

          <section id="grievance" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif font-bold text-deep-green mb-4">Grievance redressal & SCORES</h2>
            <p>
              For any query or grievance, please contact Honworth at <a href="mailto:rahul.karandikar@honworth.in" className="text-gold underline hover:text-gold/80 transition-colors">rahul.karandikar@honworth.in</a> / <a href="tel:+919923375175" className="text-gold underline hover:text-gold/80 transition-colors">+91 9923375175</a>. If your grievance is not resolved satisfactorily, you may escalate it to the relevant Asset Management Company and its Registrar & Transfer Agent (CAMS / KFintech). Investor grievances may also be lodged on the SEBI Complaints Redress System (SCORES) portal at <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold/80 transition-colors">scores.sebi.gov.in</a>, and through the SEBI Online Dispute Resolution (ODR) mechanism at <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold/80 transition-colors">smartodr.in</a>.
            </p>
          </section>

          <section id="privacy-terms" className="scroll-mt-32 border-t border-sage/20 pt-8">
            <h2 className="text-2xl font-serif font-bold text-deep-green mb-4">Privacy Policy & Terms of Use</h2>
            <p>
              Please view our dedicated legal pages for details on terms of website use and user data handling:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
              <li>
                <Link href="/privacy-policy" className="text-gold underline hover:text-gold/80 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gold underline hover:text-gold/80 transition-colors">
                  Terms of Use (Disclaimer)
                </Link>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

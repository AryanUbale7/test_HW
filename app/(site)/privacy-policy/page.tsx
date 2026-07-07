import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-serif text-deep-green mb-4">Privacy Policy</h1>
        <p className="text-sm font-sans text-charcoal/70 mb-12">Last Updated: [DATE TBD]</p>

        {/* Table of Contents */}
        <nav className="bg-sage-mist/50 p-6 rounded-sm mb-12 border border-sage/30">
          <h2 className="text-sm font-bold uppercase tracking-wider text-deep-green mb-4">Contents</h2>
          <ul className="space-y-2 text-sm font-sans text-charcoal">
            <li><a href="#section-1" className="hover:text-gold hover:underline">1. Information We Collect</a></li>
            <li><a href="#section-2" className="hover:text-gold hover:underline">2. How We Use Your Information</a></li>
            <li><a href="#section-3" className="hover:text-gold hover:underline">3. Information Sharing and Disclosure</a></li>
            <li><a href="#section-4" className="hover:text-gold hover:underline">4. Data Security</a></li>
            <li><a href="#section-5" className="hover:text-gold hover:underline">5. Your Rights</a></li>
          </ul>
        </nav>

        {/* Legal Content */}
        <div className="space-y-12 font-sans text-charcoal leading-relaxed">
          <section id="section-1">
            <h2 className="text-2xl font-serif text-deep-green mb-4">1. Information We Collect</h2>
            <p>[LEGAL COPY TBD] We collect information that you provide directly to us, including but not limited to your name, contact information, financial status, and investment objectives when you inquire about our services.</p>
          </section>

          <section id="section-2">
            <h2 className="text-2xl font-serif text-deep-green mb-4">2. How We Use Your Information</h2>
            <p>[LEGAL COPY TBD] The information we collect is used strictly for the purpose of providing financial stewardship services, facilitating account openings, and maintaining regulatory compliance as mandated by SEBI, AMFI, and IRDAI.</p>
          </section>

          <section id="section-3">
            <h2 className="text-2xl font-serif text-deep-green mb-4">3. Information Sharing and Disclosure</h2>
            <p>[LEGAL COPY TBD] We do not sell your personal data. We may share your information with Asset Management Companies (AMCs), insurance providers, and regulatory authorities strictly as required to execute your financial instructions or comply with legal obligations.</p>
          </section>

          <section id="section-4">
            <h2 className="text-2xl font-serif text-deep-green mb-4">4. Data Security</h2>
            <p>[LEGAL COPY TBD] We implement industry-standard administrative, technical, and physical safeguards designed to protect your personal information against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure, or use.</p>
          </section>

          <section id="section-5">
            <h2 className="text-2xl font-serif text-deep-green mb-4">5. Your Rights</h2>
            <p>[LEGAL COPY TBD] You have the right to access, correct, or request deletion of your personal data, subject to record-keeping obligations imposed by financial regulators. Please contact us via the details provided in the <Link href="/reach-me" className="underline hover:text-gold">Reach Me</Link> section to exercise these rights.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

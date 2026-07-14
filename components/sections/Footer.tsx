import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-green text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-12 md:pt-16">
        
        {/* 1. Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-6">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-start gap-5">
            <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C158] rounded-sm block hover:opacity-90 transition-opacity">
              <Image 
                src="/logo/logo.png" 
                alt="Honworth Logo" 
                width={240} 
                height={80} 
                className="object-contain h-16 md:h-20 w-auto rounded-sm"
              />
            </Link>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col gap-5">
            <p className="font-serif text-xl text-ivory/90 mb-1 font-semibold">Explore</p>
            <nav className="flex flex-col gap-3 font-sans font-light text-ivory/70 text-sm">
              <Link href="/my-story" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">About</Link>
              <Link href="/wealth-creation" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Wealth Creation</Link>
              <Link href="/wealth-protection" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Wealth Protection</Link>
              <Link href="/wealth-legacy" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Wealth Legacy</Link>
              <Link href="/how-i-work" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Our Approach</Link>
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-5">
            <p className="font-serif text-xl text-ivory/90 mb-1 font-semibold">Resources</p>
            <nav className="flex flex-col gap-3 font-sans font-light text-ivory/70 text-sm">
              <Link href="/library" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Library</Link>
              <Link href="/glossary" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Glossary</Link>
              <Link href="/calculators/sip" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">SIP Calculator</Link>
              <Link href="/calculators/life-cover" className="hover:text-[#E5C158] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Life Cover Estimator</Link>
            </nav>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="flex flex-col gap-5">
            <p className="font-serif text-xl text-ivory/90 mb-1 font-semibold">Get in Touch</p>
            <div className="flex flex-col gap-4 font-sans font-light text-ivory/70 text-sm">
              <a href="mailto:rahul.karandikar@honworth.in" className="hover:text-[#E5C158] transition-colors w-fit flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path><polyline points="22,7 12,14 2,7"></polyline></svg>
                rahul.karandikar@honworth.in
              </a>
              <a 
                href={`https://wa.me/919923375175?text=${encodeURIComponent("Hello, I'd like to start a conversation with Honworth.")}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Contact us on WhatsApp"
                className="hover:text-[#E5C158] transition-colors w-fit flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                WhatsApp
              </a>
              <Link href="/reach-me" className="hover:text-[#E5C158] transition-colors w-fit flex items-center gap-2 mt-2 font-medium text-ivory focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">
                Start a conversation &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* 2. Divider */}
        <hr className="border-t border-slate-700/50 my-6" />

        {/* 3. Compliance Block */}
        <div className="max-w-5xl font-sans font-light text-sm text-ivory/70 leading-relaxed mb-5 space-y-2">
          <p>
            <strong>Registration:</strong> AMFI Registered Mutual Fund Distributor | ARN–336150
          </p>
          <p>
            <strong>Disclaimer:</strong> Honworth acts as an AMFI Registered Mutual Fund Distributor, not a SEBI Registered Investment Adviser. Content is for education only, not investment advice.
          </p>
          <p>
            <strong>Risk Warning:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
          </p>
          <p className="mt-1">
            <Link href="/disclosures" className="text-[#E5C158] hover:text-[#E5C158]/80 underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">
              Read our full Disclosures &rarr;
            </Link>
          </p>
        </div>

        {/* 4. Copyright Row */}
        <div className="font-sans font-light text-sm text-ivory/60 pb-10 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <p>&copy; {new Date().getFullYear()} Honworth.</p>
          <div className="hidden md:block">&middot;</div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Link href="/disclaimer" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Disclaimer</Link>
            <span>&middot;</span>
            <Link href="/privacy-policy" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/disclosures" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-[#E5C158] focus:outline-none rounded-sm">Disclosures</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-green text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full pt-16 md:pt-24">
        
        {/* 1. Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-start gap-5">
            <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm block">
              <Image 
                src="/logo/main_logo.png" 
                alt="Honworth Logo" 
                width={240} 
                height={80} 
                className="object-contain h-16 md:h-20 w-auto"
              />
            </Link>
            <p className="text-sm text-gold/80 font-light max-w-xs">
              Your wealth, honoured for generations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif text-xl text-ivory/90 mb-1">Quick Links</h4>
            <nav className="flex flex-col gap-3 font-sans font-light text-ivory/70">
              <Link href="/my-story" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">About</Link>
              <Link href="/wealth-creation" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Wealth Creation</Link>
              <Link href="/wealth-protection" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Wealth Protection</Link>
              <Link href="/wealth-legacy" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Wealth Legacy</Link>
              <Link href="/how-i-work" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Our Approach</Link>
              <Link href="/library" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Library</Link>
              <Link href="/glossary" className="hover:text-gold transition-colors w-fit focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Glossary</Link>
            </nav>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="flex flex-col gap-5">
            <h4 className="font-serif text-xl text-ivory/90 mb-1">Get in Touch</h4>
            <div className="flex flex-col gap-4 font-sans font-light text-ivory/70">
              <a href="mailto:contact@honworth.in" className="hover:text-gold transition-colors w-fit flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                contact@honworth.in
              </a>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent("Hello, I'd like to start a conversation with Honworth.")}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors w-fit flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                WhatsApp
              </a>
              <Link href="/reach-me" className="hover:text-gold transition-colors w-fit flex items-center gap-2 mt-3 font-medium text-ivory focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">
                Start a conversation &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* 2. Divider */}
        <hr className="border-t border-sage/20 mb-12" />

        {/* 3. Compliance Block */}
        <div className="max-w-5xl font-sans font-light text-sm text-ivory/70 leading-relaxed mb-12 space-y-3">
          <p>
            <strong>Registration Numbers:</strong> AMFI-registered Mutual Fund Distributor (ARN-XXXXXX) &middot; AMFI-registered SIF Distributor &middot; APMI-registered PMS Distributor.
          </p>
          <p>
            <strong>Mutual Fund Disclaimer:</strong> Mutual fund investments are subject to market risks, read all scheme related documents carefully.
          </p>
          <p>
            <strong>Educational Content Disclaimer:</strong> The content on this website and in our articles is intended for educational and informational purposes only, and should not be construed as investment or financial advice.
          </p>
          <p className="pt-2">
            <Link href="/disclosures" className="text-gold hover:text-gold/80 underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">
              Read our full Disclosures &rarr;
            </Link>
          </p>
        </div>

        {/* 4. Copyright Row */}
        <div className="font-sans font-light text-sm text-ivory/60 pb-16 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <p>&copy; {new Date().getFullYear()} Honworth.</p>
          <div className="hidden md:block">&middot;</div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Link href="/disclaimer" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Disclaimer</Link>
            <span>&middot;</span>
            <Link href="/privacy-policy" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Privacy Policy</Link>
            <span>&middot;</span>
            <Link href="/disclosures" className="hover:text-ivory transition-colors focus-visible:ring-2 focus-visible:ring-gold focus:outline-none rounded-sm">Disclosures</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

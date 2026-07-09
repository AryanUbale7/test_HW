import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const AuthorWelcome: React.FC = () => {
  return (
    <div className="bg-sage-mist/30 border border-sage/20 rounded-sm p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-sage" />

      <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative rounded-full overflow-hidden border-4 border-white shadow-sm">
        <Image 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
          alt="Honworth Advisor"
          fill
          sizes="(max-width: 768px) 160px, 192px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-serif text-deep-green mb-4">
          Welcome to Honworth. Let&apos;s Build Your Legacy.
        </h2>
        <p className="text-base md:text-lg text-charcoal/80 mb-6 max-w-2xl leading-relaxed">
          Hi, I&apos;m the principal advisor at Honworth. I help high-net-worth families, professionals, and business owners architect robust financial strategies. Whether you&apos;re looking to create, protect, or transition wealth, you&apos;re in the right place.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <Link 
            href="/how-i-work" 
            className="bg-deep-green text-ivory px-8 py-3 rounded-sm font-medium hover:bg-gold transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Work With Me
          </Link>
          <Link 
            href="/my-story" 
            className="text-deep-green border border-deep-green px-8 py-3 rounded-sm font-medium hover:bg-sage-mist transition-colors duration-300 w-full sm:w-auto text-center"
          >
            My Story
          </Link>
        </div>
      </div>
    </div>
  );
};

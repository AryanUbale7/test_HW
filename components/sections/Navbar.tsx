"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Map, Lightbulb, Shield, Award, Users,
  Handshake, Network, Coffee, Coins, CheckSquare,
  BookOpen, Library, TrendingUp, Brain, Search,
  Download, Calculator, BookMarked, Mail, MessageCircleQuestion,
  MessageSquare, Building2, Phone, Clock, MapPin,
  FileDigit, AlertCircle, ShieldAlert, Scale, Lock, BookA, HeartPulse
} from 'lucide-react';

const NAV_LINKS = [
  { 
    label: 'My Story', 
    href: '/my-story',
    dropdown: [
      { label: 'From APEX to Honworth — the journey', href: '/my-story#journey', icon: Map },
      { label: 'Why this work / your philosophy', href: '/my-story#philosophy', icon: Lightbulb },
      { label: 'Meaning of Honour + Worth', href: '/my-story#meaning', icon: Shield },
      { label: 'Credentials: AMFI MFD, PMS, SIF', href: '/my-story#credentials', icon: Award },
      { label: 'Who you serve (families, HNI)', href: '/my-story#who-i-serve', icon: Users },
    ]
  },
  { 
    label: 'How I Work', 
    href: '/how-i-work',
    dropdown: [
      { label: 'Your approach to working with families', href: '/how-i-work#approach', icon: Handshake },
      { label: 'The three arms: Creation · Protection · Legacy', href: '/how-i-work#three-arms', icon: Network },
      { label: 'Onboarding / how you engage', href: '/how-i-work#onboarding', icon: Coffee },
      { label: "How you're compensated (distributor model)", href: '/how-i-work#compensation', icon: Coins },
      { label: "What you do — and don't — do", href: '/how-i-work#do-and-dont', icon: CheckSquare },
    ]
  },
  { 
    label: 'Articles', 
    href: '/articles',
    dropdown: [
      { label: 'Educational personal-finance posts', href: '/articles?type=Insight', icon: BookOpen },
      { label: 'Filed by arm: Creation/Protection/Legacy', href: '/articles', icon: Library },
      { label: 'Economy & policy commentary', href: '/articles?type=News', icon: TrendingUp },
      { label: 'Behavioural finance / investor mindset', href: '/articles?type=Insight', icon: Brain },
      { label: 'Search + category archive', href: '/articles', icon: Search },
    ]
  },
  { 
    label: 'My Library', 
    href: '/library',
    dropdown: [
      { label: 'Downloadable guides & checklists', href: '/library#guides', icon: Download },
      { label: 'SIP Calculator', href: '/calculators/sip', icon: Calculator },
      { label: 'Life Cover Estimator', href: '/calculators/life-cover', icon: HeartPulse },
      { label: 'Recommended reading', href: '/library#reading', icon: BookMarked },
      { label: 'Email lead-capture for resources', href: '/library#resources', icon: Mail },
      { label: 'FAQs', href: '/library#faqs', icon: MessageCircleQuestion },
      { label: 'Glossary', href: '/glossary', icon: BookA },
    ]
  },
  { 
    label: 'Reach Me', 
    href: '/reach-me',
    dropdown: [
      { label: 'Contact form', href: '/reach-me#form', icon: MessageSquare },
      { label: 'Email · phone · office address', href: '/reach-me#contact-info', icon: Building2 },
      { label: 'WhatsApp / QR link', href: '/reach-me#whatsapp', icon: Phone },
      { label: 'Working hours', href: '/reach-me#hours', icon: Clock },
      { label: 'Location map', href: '/reach-me#map', icon: MapPin },
    ]
  },
  { 
    label: 'Disclosures', 
    href: '/disclosures',
    dropdown: [
      { label: 'ARN · SIFD · APRN numbers', href: '/disclosures#numbers', icon: FileDigit },
      { label: 'Distributor (non-advisory) disclaimer', href: '/disclosures#disclaimer', icon: AlertCircle },
      { label: 'No guaranteed-returns disclaimer', href: '/disclosures#no-guarantee', icon: ShieldAlert },
      { label: 'Grievance redressal / SCORES', href: '/disclosures#grievance', icon: Scale },
      { label: 'Privacy Policy · Terms of Use', href: '/disclosures#privacy', icon: Lock },
    ]
  },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur-sm border-b border-sage/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-20 md:h-24">
        <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm shrink-0 hover:opacity-90 transition-opacity">
          <Image 
            src="/logo/logo.png" 
            alt="Honworth Logo" 
            width={240} 
            height={80} 
            className="object-contain h-16 md:h-20 w-auto rounded-sm"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group h-24 flex items-center">
              <Link 
                href={link.href}
                className="text-sm font-medium tracking-wide text-charcoal hover:text-gold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm flex items-center gap-2"
              >
                {link.label}
                <div className="relative w-2 h-2 flex items-center justify-center">
                  <div className="absolute w-1.5 h-1.5 border border-sage rotate-45 group-hover:rotate-[225deg] group-hover:bg-gold group-hover:border-gold transition-all duration-500 ease-out" />
                  <div className="absolute w-0.5 h-0.5 bg-sage rotate-45 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                </div>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[320px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="bg-ivory border border-sage/20 shadow-2xl rounded-md p-3 flex flex-col gap-1">
                  {link.dropdown.map((dropItem, idx) => {
                    const Icon = dropItem.icon;
                    return (
                      <Link
                        key={idx}
                        href={dropItem.href}
                        className="group/item flex items-start gap-4 text-charcoal/80 hover:text-deep-green hover:bg-sage-mist px-4 py-3 rounded-md transition-colors duration-200"
                      >
                        <div className="mt-0.5 bg-sage-mist/50 p-1.5 rounded-md group-hover/item:bg-gold/10 transition-colors">
                          <Icon className="w-4 h-4 text-sage group-hover/item:text-gold transition-colors" />
                        </div>
                        <span className="text-sm font-medium leading-snug">{dropItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm transition-colors hover:text-gold ml-auto"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav className="xl:hidden bg-ivory border-b border-sage/20 px-6 py-6 overflow-y-auto max-h-[calc(100vh-80px)]" aria-label="Mobile Navigation">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-sage/10 pb-4 last:border-0">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleDropdown(link.label)}
                >
                  <Link
                    href={link.href}
                    className="block text-xl font-serif text-charcoal group-hover:text-gold focus:outline-none transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <button 
                    aria-label={`Toggle ${link.label} submenu`}
                    aria-expanded={activeDropdown === link.label}
                    className="p-4 text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm relative flex items-center justify-center w-12 h-12"
                  >
                    <div className={`absolute w-2 h-2 border border-sage rotate-45 transition-all duration-500 ease-out ${activeDropdown === link.label ? 'rotate-[225deg] bg-gold border-gold' : ''}`} />
                    <div className={`absolute w-1 h-1 bg-sage rotate-45 transition-opacity duration-300 ${activeDropdown === link.label ? 'opacity-0' : 'opacity-100'}`} />
                  </button>
                </div>
                
                {/* Mobile Dropdown Sub-items */}
                {activeDropdown === link.label && (
                  <ul className="mt-4 flex flex-col gap-2 pl-2">
                    {link.dropdown.map((dropItem, idx) => {
                      const Icon = dropItem.icon;
                      return (
                        <li key={idx}>
                          <Link
                            href={dropItem.href}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-sage-mist transition-colors group/item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="bg-sage-mist/50 p-1.5 rounded-md group-hover/item:bg-gold/10 transition-colors">
                              <Icon className="w-4 h-4 text-sage group-hover/item:text-gold" />
                            </div>
                            <span className="text-base text-charcoal/80 group-hover/item:text-deep-green leading-snug">
                              {dropItem.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

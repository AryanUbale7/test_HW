import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResourceCard } from '@/components/sections/ResourceCard';
import { FaqAccordion } from '@/components/sections/FaqAccordion';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'My Library | Honworth',
  description: 'Access exclusive financial guides, downloadable checklists, recommended reading, and frequently asked questions on wealth creation, protection, and legacy.',
  alternates: {
    canonical: 'https://honworth.in/library',
  },
};

export default async function LibraryPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gimmekpwypvlkbisygzz.supabase.co';

  // Exact 3 downloadable guides and checklists from the document
  const resources = [
    {
      _id: 'guide-1',
      title: 'Questions Before Your First Insurance Policy',
      description: 'Key questions to ask and evaluate before committing to an insurance policy to ensure complete protection.',
      fileUrl: '/resources/Honworth_Questions_Before_First_Insurance.pdf',
      gatedByEmail: true,
    },
    {
      _id: 'guide-2',
      title: 'Questions Before Your First Mutual Fund Investment',
      description: 'A comprehensive checklist for selecting and investing in mutual funds in India.',
      fileUrl: '/resources/Honworth_Questions_Before_First_MF.pdf',
      gatedByEmail: true,
    },
    {
      _id: 'guide-3',
      title: 'Family Financial Checklist',
      description: 'Ensure your family is fully aligned and organized across all financial assets, nominations, and term insurance.',
      fileUrl: '/resources/Honworth_Family_Financial_Checklist.pdf',
      gatedByEmail: true,
    },
  ];

  // Exact 8 FAQs from the document
  const libraryFaqs = [
    {
      id: 'faq-a',
      question: "What's the minimum amount I can start investing with?",
      answer: "Less than most people think — you can begin a mutual fund SIP with as little as ₹500 a month. The amount matters far less than the habit; starting small and staying consistent beats waiting until you have a large sum."
    },
    {
      id: 'faq-b',
      question: "What is the ideal age to start investing in mutual funds?",
      answer: "The honest answer is: as early as you can. Time is the most powerful ingredient in investing — money invested in your twenties has decades to compound. That said, the second-best time is always today, whatever your age."
    },
    {
      id: 'faq-c',
      question: "What's the difference between mutual funds, PMS, and SIF?",
      answer: "Broadly, they differ in who they're built for. Mutual funds pool money from many investors and suit almost everyone, at low minimums. PMS (Portfolio Management Services) offers a more customised portfolio for larger investors, with a higher entry threshold. SIF (Specialized Investment Fund) is a newer category sitting between the two, with more flexible strategies. Each has its place depending on your size, goals, and risk appetite."
    },
    {
      id: 'faq-d',
      question: "How much life cover does my family actually need?",
      answer: "A common starting point is enough to replace your income and clear any outstanding loans, so your family can maintain their life if something happens to you. The exact figure depends on your income, dependents, and liabilities — but the goal is simple: that those who rely on you aren't left financially stranded."
    },
    {
      id: 'faq-e',
      question: 'Term insurance or a policy that "returns" my money — which is better?',
      answer: "They do different jobs. Term insurance is pure protection — low cost, high cover — meant to protect your family. Policies that also \"returns\" money mix insurance with savings, and usually cost far more for the same cover. Once you're clear on what each is for, the right choice for your situation usually becomes obvious."
    },
    {
      id: 'faq-f',
      question: "Isn't my employer's health cover enough?",
      answer: "It's a good start, but it usually ends the day your job does — leaving you exposed between jobs or after retirement, when you may need it most. It also may not be large enough for a serious illness. That's why many people keep their own health policy alongside the office one."
    },
    {
      id: 'faq-g',
      question: "What's the point of insurance if I rarely claim?",
      answer: "That's exactly the point — insurance isn't meant to be \"used.\" It's protection you hope never to need, quietly shielding your savings from a single large, unexpected event. Its value isn't in claiming; it's in not having your financial plans derailed when life goes wrong."
    },
    {
      id: 'faq-h',
      question: "Is a Will really necessary, or can I keep it optional?",
      answer: "It's more necessary than most people realise. Without a Will, the law decides how your assets are distributed — which may not match your wishes, and often leaves families tangled in delays and disputes at the worst possible time. A nominee, importantly, is only a custodian, not the final owner. A clear Will is one of the kindest, simplest things you can do for the people you leave behind."
    }
  ];

  // Books list
  const books = [
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      review: "The book I wish I'd read in 2016. It taught me that doing well with money has far less to do with cleverness and far more to do with behaviour and patience — the same lesson my own slow years eventually beat into me."
    },
    {
      title: "One Up on Wall Street",
      author: "Peter Lynch",
      review: "This is where investing stopped feeling like a foreign language for me. Lynch's idea that you can understand a business before you invest in it shaped how I still explain things to families today."
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      review: "Not an easy read, and I'll be honest — I set it aside more than once. But its core idea, that patience and temperament beat brilliance, is the foundation everything else I believe rests on."
    },
    {
      title: "Let's Talk Money",
      author: "Monika Halan",
      review: "The book I most often recommend to someone just starting out. It's written for the Indian family, in plain language, and it gets the basics right without ever talking down to the reader."
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      review: "Not for its specifics, which I'd take with a pinch of salt — but for the mindset shift it sparked in me early on: the difference between working for money and having money work for you."
    }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://honworth.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Library",
        "item": "https://honworth.in/library"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": libraryFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-ivory min-h-screen pt-10 pb-20">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Resources Section */}
      <section id="guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 scroll-mt-32">
        <div id="reading" className="scroll-mt-32" />
        <SectionHeader 
          eyebrow="My Library"
          heading="1. Downloadable guides and Checklists:"
          subtext="In-depth materials designed to help you navigate complex wealth decisions with clarity."
          className="mb-16"
          headingTag="h1"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <ResourceCard 
              key={resource._id}
              id={resource._id}
              title={resource.title}
              description={resource.description}
              fileUrl={resource.fileUrl}
              gatedByEmail={resource.gatedByEmail}
            />
          ))}
        </div>
      </section>

      {/* Recommended Reading Section */}
      <section className="bg-sage-mist border-y border-sage/30 py-12 md:py-20 mb-2 md:mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            eyebrow="Curated List"
            heading="2. Recommended reading: Few of my favorite books:"
            subtext="Literature that has deeply shaped our approach to patience, behavior, and investment discipline."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {books.map((book, idx) => (
              <div key={idx} className="bg-ivory/60 border border-sage/20 p-8 rounded-sm hover:border-gold/30 transition-all duration-300">
                <h3 className="text-xl font-serif text-deep-green font-bold">
                  {book.title}
                </h3>
                <p className="text-xs font-sans text-gold font-medium uppercase tracking-widest mt-1 mb-4">
                  By {book.author}
                </p>
                <p className="text-sm font-sans text-charcoal/80 leading-relaxed italic">
                  "{book.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-8 md:pt-10 md:pb-12 scroll-mt-32">
        <SectionHeader 
          heading="3. FAQs:"
          align="center"
          className="mb-8 md:mb-12"
        />
        <FaqAccordion items={libraryFaqs} />
      </section>

    </div>
  );
}

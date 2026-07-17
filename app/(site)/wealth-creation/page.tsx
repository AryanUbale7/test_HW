import React from 'react';
import { Metadata } from 'next';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';
import { getPrimaryAuthor, getPosts } from '@/lib/queries/posts';
import { getGlossaryTermsByArm } from '@/lib/queries/glossary';

export const metadata: Metadata = {
  title: 'Wealth Creation | Honworth',
  description: 'Strategic, long-term compounding strategies for building generational wealth. We guide asset allocation and mutual fund, SIF, and PMS selection.',
  alternates: {
    canonical: 'https://honworth.in/wealth-creation',
  },
  openGraph: {
    title: 'Wealth Creation | Honworth',
    description: 'Strategic, long-term compounding strategies for building generational wealth. We guide asset allocation and mutual fund, SIF, and PMS selection.',
    url: 'https://honworth.in/wealth-creation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealth Creation | Honworth',
    description: 'Strategic, long-term compounding strategies for building generational wealth. We guide asset allocation and mutual fund, SIF, and PMS selection.',
  },
};

export default async function WealthCreationPage() {
  const [author, { posts }, glossaryTerms] = await Promise.all([
    getPrimaryAuthor(),
    getPosts({ limit: 3, arm: 'Creation' }),
    getGlossaryTermsByArm('Creation', 3),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://honworth.in/wealth-creation/#webpage",
        "url": "https://honworth.in/wealth-creation",
        "name": "Wealth Creation | Honworth",
        "description": "Strategic, long-term compounding strategies for building generational wealth."
      },
      {
        "@type": "Service",
        "@id": "https://honworth.in/wealth-creation/#service",
        "name": "Wealth Creation & Asset Allocation",
        "serviceType": "Financial Advisory",
        "provider": {
          "@type": "ProfessionalService",
          "name": "Honworth Wealth Advisory",
          "url": "https://honworth.in"
        },
        "description": "Customized investment allocation utilizing Mutual Funds, PMS, and SIF frameworks for long-term compound growth."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArmPageTemplate 
        heading="Wealth Creation"
        author={author}
        posts={posts}
        glossaryTerms={glossaryTerms}
        philosophyText={`Wealth creation at Honworth is built on a disciplined, goal-based compounding approach rather than short-term market speculation. We believe a structured asset allocation strategy tailored to your family's specific financial milestones is the most reliable engine for generating long-term wealth.`}
        offeringDescription={`Honworth distributes mutual funds, Portfolio Management Services (PMS), and Strategic Investment Funds (SIF) based strictly on client suitability and due diligence. We facilitate access to vetted institutional-grade wealth vehicles without pushing proprietary products.`}
        disclaimerText="Mutual fund investments are subject to market risks; read all scheme-related documents carefully."
        ctaText="Discuss your wealth creation goals"
      />
    </>
  );
}

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
};

export default async function WealthCreationPage() {
  const [author, { posts }, glossaryTerms] = await Promise.all([
    getPrimaryAuthor(),
    getPosts({ limit: 3, arm: 'Creation' }),
    getGlossaryTermsByArm('Creation', 3),
  ]);

  return (
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
  );
}

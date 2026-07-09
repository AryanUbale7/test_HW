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
      philosophyText={`True wealth creation is rooted in a long-term, goal-based compounding approach rather than chasing short-term speculation. We believe a disciplined, structured asset allocation strategy tailored to your specific financial milestones is the most reliable engine for building generational wealth.

By tuning out the noise, we focus on strategic asset allocation, rigorous due diligence, and risk-adjusted returns designed to outpace inflation and secure your financial objectives.`}
      offeringDescription={`As your financial steward, we distribute carefully vetted mutual funds tailored to your portfolio's specific needs. We do not push proprietary products; our focus is entirely on selecting the right vehicles for your goals.

For eligible investors with complex requirements, we also facilitate access to Portfolio Management Services (PMS) and Strategic Investment Funds (SIF), ensuring you have the sophisticated tools necessary for institutional-grade wealth creation.`}
      disclaimerText="Mutual fund investments are subject to market risks; read all scheme-related documents carefully."
      ctaText="Discuss your wealth creation goals"
    />
  );
}

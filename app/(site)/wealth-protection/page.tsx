import React from 'react';
import { Metadata } from 'next';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';
import { getPrimaryAuthor, getPosts } from '@/lib/queries/posts';
import { getGlossaryTermsByArm } from '@/lib/queries/glossary';

export const metadata: Metadata = {
  title: 'Wealth Protection | Honworth',
  description: 'Insulate your assets and family from unforeseen liabilities. We specialize in term life and health insurance strategies for HNW families.',
  alternates: {
    canonical: 'https://honworth.in/wealth-protection',
  },
};

export default async function WealthProtectionPage() {
  const [author, { posts }, glossaryTerms] = await Promise.all([
    getPrimaryAuthor(),
    getPosts({ limit: 3, arm: 'Protection' }),
    getGlossaryTermsByArm('Protection', 3),
  ]);

  return (
    <ArmPageTemplate 
      heading="Wealth Protection"
      author={author}
      posts={posts}
      glossaryTerms={glossaryTerms}
      philosophyText={`Wealth protection at Honworth is the indispensable defensive foundation of a robust financial journey. We believe a secure, term-first protective structure is essential to shield your family and assets from unforeseen, catastrophic liabilities.`}
      offeringDescription={`Honworth coordinates pure-risk term life and health insurance covers empanelled with leading providers like Bajaj Allianz Life and TATA AIA Life. We navigate the complexities of underwriting to secure maximum coverage limits for high-net-worth families.`}
      disclaimerText="Insurance is the subject matter of solicitation. All commissions and policies are disclosed prior to transactions."
      ctaText="Secure your wealth protection strategy"
    />
  );
}

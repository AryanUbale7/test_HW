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
      philosophyText={`Wealth protection is the indispensable foundation of any robust financial architecture. We believe a secure, term-first protective structure is essential to shield your family and assets from unforeseen, catastrophic liabilities.

A single unforeseen event should never be permitted to dismantle decades of hard work. We focus on identifying vulnerabilities in your current financial architecture and deploying precise, cost-effective instruments to insulate your family and assets.`}
      offeringDescription={`We specialize in pure-risk coverage, prioritizing term life and health structures that offer maximum protection without unnecessary complexity.

To provide you with premier coverage options, we coordinate with leading providers including Bajaj Allianz Life and TATA AIA Life. Our role is to navigate the complexities of underwriting and secure the exact coverage limits your legacy demands.`}
      disclaimerText="Insurance is the subject matter of solicitation. All commissions and policies are disclosed prior to transactions."
      ctaText="Secure your wealth protection strategy"
    />
  );
}

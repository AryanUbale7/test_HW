import React from 'react';
import { Metadata } from 'next';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';
import { getPrimaryAuthor } from '@/lib/queries/posts';

export const metadata: Metadata = {
  title: 'Wealth Legacy | Honworth',
  description: 'Meticulous succession and estate facilitation. We coordinate Wills, nominations, and private family trusts to transition wealth seamlessly.',
  alternates: {
    canonical: 'https://honworth.in/wealth-legacy',
  },
};

export default async function WealthLegacyPage() {
  const author = await getPrimaryAuthor();
  return (
    <ArmPageTemplate 
      heading="Wealth Legacy"
      author={author}
      philosophyText={`Wealth legacy is the structured coordination of succession planning to ensure your life's work is seamlessly transitioned to future generations. We believe a well-architected succession strategy prevents familial friction and preserves family capital across generations with absolute clarity.

Ensuring a smooth transition requires foresight, discretion, and meticulous structuring. It is about ensuring your intentions are honored with certainty and transparency.`}
      offeringDescription={`We provide comprehensive succession and estate facilitation services. This involves coordinating the complex mechanics of Wills, secure nominations, and the establishment of private family trusts.

We serve as the coordinator for your legacy, working intimately alongside your preferred legal professionals and tax advisors to ensure that your strategies translate into flawlessly executed legal structures.`}
      disclaimerText="Succession services involve facilitation and coordination; Honworth is not a law firm and does not provide legal or tax advice."
      ctaText="Begin drafting your legacy blueprint"
    />
  );
}

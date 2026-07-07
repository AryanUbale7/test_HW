import React from 'react';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';

export default function WealthLegacyPage() {
  return (
    <ArmPageTemplate 
      heading="Wealth Legacy"
      philosophyText={`[PLACEHOLDER] Your wealth is the financial manifestation of your life's work. Ensuring its smooth transition to the next generation requires foresight, discretion, and meticulous structuring.

[PLACEHOLDER] We believe that a well-architected legacy plan prevents familial friction and preserves your capital across generations. It is about ensuring your intentions are honored with clarity and certainty.`}
      offeringDescription={`[PLACEHOLDER] We provide comprehensive succession and estate facilitation services. This involves coordinating the complex mechanics of Wills, secure nominations, and the establishment of private family trusts.

[PLACEHOLDER] We serve as the quarterback for your legacy, working intimately alongside your preferred legal professionals and tax advisors to ensure that the theoretical strategies translate into flawlessly executed legal structures.`}
      disclaimerText="Succession services involve facilitation and coordination; Honworth is not a law firm and does not provide legal advice."
      ctaText="Begin drafting your legacy blueprint"
    />
  );
}

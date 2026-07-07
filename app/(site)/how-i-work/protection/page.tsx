import React from 'react';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';

export default function WealthProtectionPage() {
  return (
    <ArmPageTemplate 
      heading="Wealth Protection"
      philosophyText={`[PLACEHOLDER] Before we build, we protect. Our term-first philosophy dictates that the foundation of any robust financial plan is a secure defensive structure. 

[PLACEHOLDER] A single unforeseen event should never be permitted to dismantle decades of hard work. We focus on identifying vulnerabilities in your current financial architecture and deploying precise, cost-effective instruments to insulate your family and assets from catastrophic liabilities.`}
      offeringDescription={`[PLACEHOLDER] We specialize in pure-risk coverage, prioritizing term life and health structures that offer maximum protection without unnecessary complexity. 

[PLACEHOLDER] To provide you with premier coverage options, we are proudly empanelled with leading providers including Bajaj Life [CONFIRM] and TATA AIA [CONFIRM]. Our role is to navigate the complexities of underwriting and secure the exact coverage limits your legacy demands.`}
      disclaimerText="Insurance is the subject matter of solicitation."
      ctaText="Secure your wealth protection strategy"
    />
  );
}

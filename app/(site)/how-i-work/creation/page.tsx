import React from 'react';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';

export default function WealthCreationPage() {
  return (
    <ArmPageTemplate 
      heading="Wealth Creation"
      philosophyText={`[PLACEHOLDER] True wealth creation is not about chasing outsized short-term gains. It is rooted in a long-term, goal-based investing philosophy. We believe that a disciplined, structured approach to compounding capital is the most reliable engine for generational wealth.

[PLACEHOLDER] We ignore the noise and focus on strategic asset allocation, rigorous due diligence, and risk-adjusted returns designed to outpace inflation and achieve your specific financial milestones.`}
      offeringDescription={`[PLACEHOLDER] As your financial steward, we distribute carefully vetted mutual funds tailored to your portfolio's specific needs. We do not push proprietary products; our focus is entirely on selecting the right vehicles for your goals.

[PLACEHOLDER] For eligible investors with complex requirements, we also facilitate access to Portfolio Management Services (PMS) and Strategic Investment Funds (SIF), ensuring you have the sophisticated tools necessary for institutional-grade wealth creation.`}
      disclaimerText="Mutual fund investments are subject to market risks; read all scheme-related documents carefully."
      ctaText="Discuss your wealth creation goals"
    />
  );
}

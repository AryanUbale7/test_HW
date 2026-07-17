import React from 'react';
import { Metadata } from 'next';
import { ArmPageTemplate } from '@/components/sections/ArmPageTemplate';
import { getPrimaryAuthor, getPosts } from '@/lib/queries/posts';
import { getGlossaryTermsByArm } from '@/lib/queries/glossary';

export const metadata: Metadata = {
  title: 'Wealth Legacy | Honworth',
  description: 'Meticulous succession and estate facilitation. We coordinate Wills, nominations, and private family trusts to transition wealth seamlessly.',
  alternates: {
    canonical: 'https://honworth.in/wealth-legacy',
  },
  openGraph: {
    title: 'Wealth Legacy | Honworth',
    description: 'Meticulous succession and estate facilitation. We coordinate Wills, nominations, and private family trusts to transition wealth seamlessly.',
    url: 'https://honworth.in/wealth-legacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealth Legacy | Honworth',
    description: 'Meticulous succession and estate facilitation. We coordinate Wills, nominations, and private family trusts to transition wealth seamlessly.',
  },
};

export default async function WealthLegacyPage() {
  const [author, { posts }, glossaryTerms] = await Promise.all([
    getPrimaryAuthor(),
    getPosts({ limit: 3, arm: 'Legacy' }),
    getGlossaryTermsByArm('Legacy', 3),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://honworth.in/wealth-legacy/#webpage",
        "url": "https://honworth.in/wealth-legacy",
        "name": "Wealth Legacy | Honworth",
        "description": "Meticulous succession and estate facilitation."
      },
      {
        "@type": "Service",
        "@id": "https://honworth.in/wealth-legacy/#service",
        "name": "Wealth Legacy & Estate Planning",
        "serviceType": "Estate Planning Facilitation",
        "provider": {
          "@type": "ProfessionalService",
          "name": "Honworth Wealth Advisory",
          "url": "https://honworth.in"
        },
        "description": "Coordination and facilitation of private family trusts, wills, nominations, and asset succession structuring."
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
        heading="Wealth Legacy"
        author={author}
        posts={posts}
        glossaryTerms={glossaryTerms}
        philosophyText={`Wealth legacy at Honworth is the structured coordination of succession planning to ensure your assets are seamlessly transitioned to future generations. We believe a well-architected succession blueprint prevents familial friction and preserves family capital across generations with absolute clarity.`}
        offeringDescription={`Honworth facilitates succession planning in India by coordinating Wills, bank account nominations, and the establishment of private family trusts. We act as your legacy coordinator, aligning with your preferred legal and tax professionals.`}
        disclaimerText="Succession services involve facilitation and coordination; Honworth is not a law firm and does not provide legal or tax advice."
        ctaText="Begin drafting your legacy blueprint"
      />
    </>
  );
}

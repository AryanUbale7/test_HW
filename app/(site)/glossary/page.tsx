import React from 'react';
import { Metadata } from 'next';
import { getAllGlossaryTerms } from '@/lib/queries/glossary';
import { GlossaryIndex } from '@/components/sections/GlossaryIndex';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Financial Glossary | Honworth',
  description: 'Plain-language definitions of SIP, term insurance, Will, nomination, asset allocation, and 10+ more essential wealth-planning terms.',
  alternates: {
    canonical: 'https://honworth.in/glossary',
  },
};

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms();
  return <GlossaryIndex terms={terms} />;
}

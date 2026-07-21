import React from 'react';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { getLaunchSettings } from '@/lib/queries/site-settings';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  try {
    const { siteMode } = await getLaunchSettings();
    if (siteMode === 'coming_soon') {
      redirect('/coming-soon');
    }
  } catch (error) {
    // Fail open safely if DB query errors out or redirects
    if ((error as any)?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error; // Let Next.js handle the redirect
    }
    console.error('Failed to fetch site mode in SiteLayout:', error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

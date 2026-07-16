import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honworth.in'),
  title: "Honworth",
  description: "Premium wealth-advisory brochure + blog site",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gimmekpwypvlkbisygzz.supabase.co';
const supabaseOrigin = new URL(supabaseUrl).origin;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={supabaseOrigin} />
        <link rel="dns-prefetch" href={supabaseOrigin} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${merriweather.variable} font-sans antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

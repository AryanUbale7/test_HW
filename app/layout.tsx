import type { Metadata } from "next";
import { Kameron } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const kameron = Kameron({
  variable: "--font-kameron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://honworth.in'),
  title: {
    default: "Honworth",
    template: "%s | Honworth"
  },
  description: "Bespoke wealth management, risk protection, and legacy structuring for high-net-worth families.",
  openGraph: {
    title: "Honworth",
    description: "Bespoke wealth management, risk protection, and legacy structuring for high-net-worth families.",
    url: 'https://honworth.in',
    siteName: 'Honworth',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Honworth",
    description: "Bespoke wealth management, risk protection, and legacy structuring for high-net-worth families.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${kameron.variable} font-sans antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

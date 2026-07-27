import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gimmekpwypvlkbisygzz.supabase.co';
const supabaseHost = new URL(supabaseUrl).hostname;
const supabaseOrigin = new URL(supabaseUrl).origin;
const supabaseWss = supabaseOrigin.replace(/^http/, 'ws');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: supabaseHost,
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icon.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com;",
              "frame-src 'self' https://calendly.com https://www.google.com https://maps.google.com;",
              `connect-src 'self' ${supabaseOrigin} ${supabaseWss};`,
              `img-src 'self' blob: data: https://images.unsplash.com ${supabaseOrigin};`,
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com;",
              "font-src 'self';",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;"
            ].join(' '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/how-i-work/creation',
        destination: '/wealth-creation',
        permanent: true,
      },
      {
        source: '/how-i-work/protection',
        destination: '/wealth-protection',
        permanent: true,
      },
      {
        source: '/how-i-work/legacy',
        destination: '/how-i-work#three-arms',
        permanent: true,
      },
      {
        source: '/wealth-legacy',
        destination: '/how-i-work#three-arms',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


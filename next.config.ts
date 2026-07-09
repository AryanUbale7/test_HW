import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'gimmekpwypvlkbisygzz.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com;",
              "frame-src 'self' https://calendly.com;",
              "connect-src 'self' https://gimmekpwypvlkbisygzz.supabase.co wss://gimmekpwypvlkbisygzz.supabase.co;",
              "img-src 'self' blob: data: https://images.unsplash.com https://gimmekpwypvlkbisygzz.supabase.co;",
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
        destination: '/wealth-legacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

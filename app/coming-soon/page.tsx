'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false)
  const [siteMode, setSiteMode] = useState<string>('coming_soon')

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/site-settings', { cache: 'no-store' })
      const data = await res.json()
      setSiteMode(data.siteMode)
    } catch {
      // fallback
    }
  }, [])

  useEffect(() => {
    fetchSettings()
    setMounted(true)
  }, [fetchSettings])

  useEffect(() => {
    if (siteMode === 'live') {
      window.location.href = '/'
    }
  }, [siteMode])

  // Poll server every 30 seconds to check if site goes live
  useEffect(() => {
    const poll = setInterval(fetchSettings, 30000)
    return () => clearInterval(poll)
  }, [fetchSettings])

  return (
    <div className="min-h-screen bg-[#0A1A0F] relative overflow-hidden flex flex-col items-center justify-center px-4">

      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A0F] via-[#0F2415] to-[#0A1A0F]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#1B4332]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#CBA32E]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#1B4332]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

      {/* Content */}
      <div className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#CBA32E]/10 rounded-full blur-xl" />
            <Image
              src="/logo/logo.png"
              alt="Honworth"
              width={220}
              height={73}
              className="relative h-14 w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-medium leading-tight tracking-tight max-w-lg mx-auto">
            Some things are worth building slowly.
          </h1>
          <p className="text-[#CBA32E] text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase mt-6">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  )
}

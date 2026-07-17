'use client'

import { useState, useEffect, useRef, useTransition } from 'react'
import { Rocket, Globe, Clock, Eye, Power, Save, Loader2 } from 'lucide-react'
import { updateLaunchSettings, launchNow } from '@/lib/actions/site-settings'

interface LaunchControlCardProps {
  initialMode: 'live' | 'coming_soon'
  initialLaunchDate: string | null
}

function formatCountdown(targetDate: string): string {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return 'Countdown complete'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function LaunchControlCard({ initialMode, initialLaunchDate }: LaunchControlCardProps) {
  const [mode, setMode] = useState<'live' | 'coming_soon'>(initialMode)
  const [launchDate, setLaunchDate] = useState(initialLaunchDate || '')
  const [countdown, setCountdown] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isLaunching, setIsLaunching] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (mode === 'coming_soon' && launchDate) {
      const tick = () => setCountdown(formatCountdown(launchDate))
      tick()
      timerRef.current = setInterval(tick, 1000)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    } else {
      setCountdown('')
    }
  }, [mode, launchDate])

  const handleSave = () => {
    setMessage(null)
    startTransition(async () => {
      const fd = new FormData()
      fd.set('site_mode', mode)
      if (launchDate) fd.set('launch_date', launchDate)
      const result = await updateLaunchSettings(fd)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Settings saved successfully.' })
      }
    })
  }

  const handleLaunchNow = () => {
    setMessage(null)
    setIsLaunching(true)
    startTransition(async () => {
      const result = await launchNow()
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMode('live')
        setMessage({ type: 'success', text: 'Website is now LIVE!' })
      }
      setIsLaunching(false)
    })
  }

  const isLive = mode === 'live'

  return (
    <div className="bg-white rounded-lg border border-sage/20 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-sage/15 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-deep-green/10 text-deep-green">
            <Rocket size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-deep-green font-serif">Website Launch Control</h3>
            <p className="text-[10px] text-charcoal/50 font-sans">Manage site visibility and launch timing</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          isLive 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
          {isLive ? 'Live' : 'Coming Soon'}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">

        {/* Toggle Switch */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-charcoal/70 font-sans uppercase tracking-wider">Site Mode</label>
          <div className="flex bg-sage-mist/40 rounded-md p-0.5 border border-sage/20">
            <button
              type="button"
              onClick={() => setMode('live')}
              className={`px-4 py-1.5 text-xs font-bold rounded transition-all duration-300 font-sans ${
                isLive
                  ? 'bg-deep-green text-white shadow-sm'
                  : 'text-charcoal/50 hover:text-charcoal/70'
              }`}
            >
              <Globe size={12} className="inline mr-1.5 -mt-0.5" />
              LIVE
            </button>
            <button
              type="button"
              onClick={() => setMode('coming_soon')}
              className={`px-4 py-1.5 text-xs font-bold rounded transition-all duration-300 font-sans ${
                !isLive
                  ? 'bg-gold text-white shadow-sm'
                  : 'text-charcoal/50 hover:text-charcoal/70'
              }`}
            >
              <Clock size={12} className="inline mr-1.5 -mt-0.5" />
              COMING SOON
            </button>
          </div>
        </div>

        {/* Launch Date Picker (only visible in Coming Soon mode) */}
        {!isLive && (
          <div className="space-y-2 p-3.5 rounded-md bg-[#FAF6EE] border border-gold/15">
            <label htmlFor="launch_date" className="text-xs font-semibold text-charcoal/70 font-sans uppercase tracking-wider block">
              Launch Date & Time
            </label>
            <input
              id="launch_date"
              type="datetime-local"
              value={launchDate ? new Date(new Date(launchDate).getTime() - new Date(launchDate).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
              onChange={(e) => setLaunchDate(e.target.value ? new Date(e.target.value).toISOString() : '')}
              className="w-full px-3 py-2 border border-sage/30 rounded-md text-sm font-sans bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
            />
            {countdown && (
              <div className="flex items-center gap-2 mt-2">
                <Clock size={12} className="text-gold" />
                <span className="text-xs font-mono font-bold text-deep-green tracking-wide">{countdown}</span>
              </div>
            )}
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div className={`p-3 rounded-md text-xs font-sans font-medium ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 bg-deep-green text-white text-xs font-semibold rounded-md hover:bg-deep-green/90 disabled:opacity-50 transition-all font-sans shadow-sm"
          >
            {isPending && !isLaunching ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Save Settings
          </button>

          {!isLive && (
            <button
              type="button"
              onClick={handleLaunchNow}
              disabled={isPending}
              className="flex items-center gap-1.5 px-4 py-2 bg-gold text-white text-xs font-semibold rounded-md hover:bg-gold/90 disabled:opacity-50 transition-all font-sans shadow-sm"
            >
              {isLaunching ? <Loader2 size={13} className="animate-spin" /> : <Power size={13} />}
              Launch Now
            </button>
          )}

          <a
            href="/coming-soon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-charcoal text-xs font-semibold rounded-md border border-sage/30 hover:border-sage/50 transition-all font-sans"
          >
            <Eye size={13} />
            Preview Coming Soon
          </a>
        </div>
      </div>
    </div>
  )
}

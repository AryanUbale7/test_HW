'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { login } from '@/lib/actions/auth'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const initialState = {
  error: '',
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ivory via-sage-mist/20 to-sage-mist/40 px-4">
      <div className="w-full max-w-md">
        
        {/* Login Card */}
        <div className="bg-white p-10 rounded-lg border border-slate-200 shadow-xl">
          
          {/* Branded Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-slate-50/50 p-3 rounded-md border border-slate-100 mb-4 flex items-center justify-center shadow-inner">
              <Image 
                src="/logo/logo.png" 
                alt="Honworth Logo" 
                width={180} 
                height={60} 
                className="object-contain h-12 w-auto" 
                priority
              />
            </div>
            <h1 className="text-xl font-serif text-deep-green font-bold tracking-tight">Sign in to Content Studio</h1>
            <p className="text-slate-500 text-xs mt-1">Manage posts, resources, and leads</p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-deep-green font-sans bg-white text-charcoal transition-all"
                placeholder="you@honworth.in"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-deep-green font-sans bg-white text-charcoal transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 font-sans leading-relaxed">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-deep-green hover:bg-gold text-white py-2.5 px-4 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md active:scale-98"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        {/* Branded Footer */}
        <div className="text-center mt-6 text-[10px] text-slate-400 font-sans tracking-wide uppercase">
          © {new Date().getFullYear()} Honworth · Internal use only
        </div>
      </div>
    </div>
  )
}

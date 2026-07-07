'use client'

import { useActionState } from 'react'
import { login } from '@/lib/actions/auth'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

const initialState = {
  error: '',
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo/main_logo.png" 
            alt="Honworth Logo" 
            width={240} 
            height={80} 
            className="object-contain h-12 w-auto"
            priority
          />
        </div>
        
        <Card className="p-8 md:p-8 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-deep-green mb-2">Admin Access</h1>
            <p className="text-charcoal/70 text-sm">Sign in to manage Honworth</p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-sage/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border border-sage/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold bg-ivory/50"
              />
            </div>

            {state?.error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-sm border border-red-100">
                {state.error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full justify-center"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

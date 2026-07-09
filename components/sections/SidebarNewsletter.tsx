'use client';

import React, { useState } from 'react';

export const SidebarNewsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_sidebar' }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-deep-green text-ivory p-8 rounded-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full blur-2xl opacity-10 transform translate-x-1/2 -translate-y-1/2" />
      <h2 className="text-xl font-serif mb-4 relative z-10">Join Our Inner Circle</h2>
      <p className="text-sm font-sans text-ivory/80 mb-6 relative z-10">
        Get actionable wealth architecture insights delivered directly to your inbox.
      </p>
      
      {status === 'success' ? (
        <div className="bg-sage-mist/10 border border-sage/30 rounded-sm p-4 text-center relative z-10">
          <p className="text-ivory font-medium font-sans text-sm">Thank you for subscribing.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10">
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address" 
            aria-label="Email address"
            className="bg-ivory text-charcoal px-4 py-2 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="bg-gold text-ivory font-medium px-4 py-2 rounded-sm text-sm hover:bg-white hover:text-deep-green transition-colors disabled:opacity-50"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2 font-sans relative z-10">
          An error occurred. Please try again.
        </p>
      )}
    </div>
  );
};

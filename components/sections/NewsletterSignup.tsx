'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-deep-green py-16 px-4 sm:px-6 lg:px-8 my-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-serif text-ivory mb-4">
            Stewardship in your inbox.
          </h3>
          <p className="font-sans text-sage-mist/80">
            Join founders and families receiving our latest insights on wealth architecture, risk mitigation, and generational transfer.
          </p>
        </div>

        <div className="md:w-1/2 w-full">
          {status === 'success' ? (
            <div className="bg-sage-mist/10 border border-sage/30 rounded-sm p-4 text-center">
              <p className="text-ivory font-medium font-sans">Thank you for subscribing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="newsletter-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow bg-ivory/10 border border-sage/30 rounded-sm px-4 py-3 text-ivory placeholder-ivory/50 focus:outline-none focus:border-gold transition-colors"
              />
              <Button 
                type="submit" 
                variant="primary" 
                disabled={status === 'submitting'}
                className="whitespace-nowrap"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2 font-sans text-center md:text-left">An error occurred. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

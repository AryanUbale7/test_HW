'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  resourceId: string;
}

export const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose, onSuccess, resourceId }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { validateNewsletterSignup } = await import('@/lib/validations/newsletter');
    const validationError = validateNewsletterSignup(email);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resourceId }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      onSuccess();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-deep-green/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-ivory border border-sage rounded-md shadow-lg p-8 md:p-12 max-w-md w-full"
          >
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-charcoal hover:text-deep-green focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <h3 className="text-2xl font-serif text-deep-green mb-4">Access this Resource</h3>
            <p className="font-sans text-charcoal mb-8 leading-relaxed">
              Please provide your email address to download this exclusive Honworth resource.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors placeholder-charcoal/50"
                />
              </div>

              {error && <p className="text-red-600 text-sm font-sans">{error}</p>}

              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Download Now'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

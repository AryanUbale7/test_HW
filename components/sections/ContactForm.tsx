'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    message: '',
    consent: false,
    website: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setErrorMessage('You must consent to our data policy to submit an inquiry.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'General Inquiry',
        message: '',
        consent: false,
        website: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('There was a problem sending your message. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-sage-mist border border-sage p-12 text-center rounded-sm">
        <h3 className="text-2xl font-serif text-deep-green mb-4">Message Received</h3>
        <p className="font-sans text-charcoal">Thank you for reaching out. A member of our team will be in touch shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-gold font-medium underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-ivory p-8 md:p-12 border border-sage/30 rounded-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="firstName" className="block text-sm font-sans font-medium text-deep-green mb-2">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-sans font-medium text-deep-green mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="email" className="block text-sm font-sans font-medium text-deep-green mb-2">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-sans font-medium text-deep-green mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-sans font-medium text-deep-green mb-2">Nature of Inquiry</label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Wealth Creation">Wealth Building</option>
          <option value="Wealth Protection">Wealth Protection</option>
          <option value="Legacy Planning">Legacy Planning</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-sans font-medium text-deep-green mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-sage py-3 text-charcoal font-sans focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm font-sans text-charcoal leading-relaxed">
          I consent to Honworth collecting and processing my details to respond to this inquiry, in accordance with the Privacy Policy. *
        </label>
      </div>

      {/* Honeypot field for bot protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm font-sans">{errorMessage}</p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

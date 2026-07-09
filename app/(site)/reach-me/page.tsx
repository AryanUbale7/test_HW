import React from 'react';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Reach Me | Honworth',
  description: 'Start a conversation with Honworth. Book a discovery call via Calendly, submit our contact form, or connect via WhatsApp.',
  alternates: {
    canonical: 'https://honworth.in/reach-me',
  },
};

export default function ReachMePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://honworth.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reach Me",
        "item": "https://honworth.in/reach-me"
      }
    ]
  };

  return (
    <div className="bg-ivory min-h-screen py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="Reach Me"
          heading="Start a Conversation."
          subtext="Whether you have a specific inquiry or wish to explore a long-term partnership, I am available to discuss your financial architecture."
          className="mb-16 text-center mx-auto"
          align="center"
          headingTag="h1"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Main Form Area */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-serif text-deep-green mb-8">Send an Inquiry</h2>
            <ContactForm />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Direct Contact & Office */}
            <Card className="bg-sage-mist/50">
              <h3 className="text-xl font-serif text-deep-green mb-6">Direct Contact</h3>
              <div className="space-y-4 font-sans text-charcoal">
                <p>
                  <strong>Office Hours:</strong><br />
                  Monday – Friday<br />
                  9:00 AM – 6:00 PM IST
                </p>
                <p>
                  <strong>Location:</strong><br />
                  [PLACEHOLDER ADDRESS]<br />
                  Mumbai, Maharashtra, India
                </p>
                <div className="pt-4 mt-4 border-t border-sage/30">
                  <a 
                    href="https://wa.me/1234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-deep-green font-medium hover:text-gold transition-colors"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </Card>

            {/* Calendly Embed Placeholder */}
            <Card className="bg-ivory border-gold/30">
              <h3 className="text-xl font-serif text-deep-green mb-4">Schedule a Call</h3>
              <p className="font-sans text-charcoal text-sm mb-6">
                Book a 30-minute introductory discovery session directly on my calendar.
              </p>
              
              {/* Calendly inline widget placeholder */}
              <div className="h-[400px] w-full bg-sage-mist border border-sage/30 rounded-sm flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-deep-green font-serif mb-2">[Calendly Embed]</p>
                  <p className="text-xs font-sans text-charcoal">
                    Replace this div with the standard Calendly inline embed code.
                  </p>
                  <a 
                    href="https://calendly.com/[CONFIRM]" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-deep-green font-medium hover:text-gold underline"
                  >
                    Or open calendar link
                  </a>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

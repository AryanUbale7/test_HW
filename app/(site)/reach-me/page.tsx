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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 mb-16">
          {/* Main Form Area */}
          <div id="form" className="lg:col-span-3 scroll-mt-32">
            <h2 className="text-2xl font-serif text-deep-green mb-8">Send an Inquiry</h2>
            <ContactForm />
          </div>

          {/* Sidebar Area - Direct Contact */}
          <div className="lg:col-span-2">
            <Card id="contact-info" className="bg-sage-mist/50 h-full scroll-mt-32 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif text-deep-green mb-6">Direct Contact</h3>
                <div className="space-y-4 font-sans text-charcoal">
                  <p id="hours" className="scroll-mt-32">
                    <strong>Working Hours:</strong><br />
                    9:30 AM – 6:30 PM IST (Monday to Saturday)<br />
                    Sunday Holiday
                  </p>
                  <p id="map" className="scroll-mt-32">
                    <strong>Address:</strong><br />
                    Pimple Saudagar,<br />
                    Pune – 411027, Maharashtra, India
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:rahul.karandikar@honworth.in" className="underline hover:text-gold transition-colors">
                      rahul.karandikar@honworth.in
                    </a>
                  </p>
                  <p>
                    <strong>Mobile:</strong><br />
                    <a href="tel:+919923375175" className="underline hover:text-gold transition-colors">
                      +91 9923375175
                    </a>
                  </p>
                </div>
              </div>
              <div id="whatsapp" className="pt-4 mt-6 border-t border-sage/30 scroll-mt-32">
                <a 
                  href={`https://wa.me/919923375175?text=${encodeURIComponent("Hello, I'd like to start a conversation with Honworth.")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="inline-flex items-center text-deep-green font-medium hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Row 2: Location Map & Calendar Scheduling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-12 border-t border-sage/20">
          {/* Map Card */}
          <Card className="bg-sage-mist/30">
            <h3 className="text-xl font-serif text-deep-green mb-4">Find the Office</h3>
            <p className="font-sans text-charcoal text-sm mb-6">
              Honworth is located in Pimple Saudagar, Pune. View the interactive map below.
            </p>
            <div className="w-full h-[320px] rounded-sm overflow-hidden border border-sage/30 shadow-sm">
              <iframe
                title="Honworth Office Location Map"
                src="https://maps.google.com/maps?q=Pimple%20Saudagar,%20Pune%20-%20411027,%20Maharashtra,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>

          {/* Calendly Card */}
          <Card className="bg-ivory border-gold/30">
            <h3 className="text-xl font-serif text-deep-green mb-4">Schedule a Call</h3>
            <p className="font-sans text-charcoal text-sm mb-6">
              Book a 30-minute introductory discovery session directly on my calendar.
            </p>
            <div className="h-[320px] w-full bg-sage-mist border border-sage/30 rounded-sm flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-deep-green font-serif mb-2">[Calendly Calendar]</p>
                <p className="text-xs font-sans text-charcoal">
                  Click below to open the scheduling link or book a slot.
                </p>
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-deep-green font-medium hover:text-gold underline focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  Open calendar scheduling link
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

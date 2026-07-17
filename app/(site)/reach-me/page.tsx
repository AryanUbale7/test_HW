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
    <div className="bg-ivory min-h-screen pt-10 md:pt-16 pb-8 md:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="Reach Me"
          heading="Start a Conversation."
          subtext="Whether you have a specific inquiry or wish to explore a long-term partnership, I am available to discuss your financial journey."
          className="mb-16 text-center mx-auto"
          align="center"
          headingTag="h1"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 mb-0">
          {/* Main Form Area */}
          <div id="form" className="lg:col-span-3 scroll-mt-32">
            <h2 className="text-2xl font-serif text-deep-green mb-8">Send an Inquiry</h2>
            <ContactForm />
          </div>

          {/* Sidebar Area - Direct Contact & Schedule a Call */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Card id="contact-info" className="bg-sage-mist/50 scroll-mt-32">
              <h3 className="text-xl font-serif text-deep-green mb-6">Direct Contact:</h3>
              <div className="space-y-6 font-sans text-charcoal">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <div id="hours" className="scroll-mt-32">
                    <strong className="text-xs uppercase tracking-wider text-charcoal/60">Working Hours:</strong>
                    <p className="text-sm mt-1">9:30 AM – 6:30 PM IST (Mon - Sat)</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">
                      <strong className="text-xs uppercase tracking-wider text-charcoal/60 mr-1.5">Email:</strong>
                      <a href="mailto:aryanubale318@gmail.com" className="underline hover:text-gold transition-colors">
                        aryanubale318@gmail.com
                      </a>
                    </p>
                    <p className="text-sm">
                      <strong className="text-xs uppercase tracking-wider text-charcoal/60 mr-1.5">Mobile:</strong>
                      <a href="tel:+919923375175" className="underline hover:text-gold transition-colors">
                        +91 9923375175
                      </a>
                    </p>
                  </div>
                </div>

                <div id="whatsapp" className="pt-6 border-t border-sage/30 scroll-mt-32">
                  <a 
                    href={`https://wa.me/919923375175?text=${encodeURIComponent("Hello, I'd like to start a conversation with Honworth.")}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="inline-flex items-center justify-center w-full px-5 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-sans font-medium rounded-md shadow-sm hover:shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:ring-offset-2"
                  >
                    <svg className="w-5 h-5 mr-2.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.117-2.876-6.979C16.596 1.897 14.116.879 11.48.879 6.042.879 1.62 5.3 1.615 10.74c-.002 1.673.441 3.303 1.288 4.747l-.999 3.648 3.743-.981zm11.376-7.254c-.3-.15-1.771-.875-2.028-.969-.258-.094-.446-.14-.633.14-.187.281-.726.912-.889 1.097-.164.186-.328.21-.628.06-1.192-.596-2.073-1.04-2.893-2.44-.22-.379.22-.351.628-1.161.094-.188.047-.353-.024-.503-.071-.15-.633-1.526-.867-2.09-.228-.547-.46-.473-.633-.482-.164-.008-.352-.01-.54-.01-.188 0-.493.07-.75.352-.259.282-.988.966-.988 2.357 0 1.39.1 2.732.114 2.92.015.188 2.017 3.08 4.887 4.316.682.294 1.214.47 1.629.601.686.218 1.312.187 1.806.114.551-.081 1.771-.724 2.018-1.39.248-.667.248-1.238.174-1.39-.074-.15-.271-.24-.571-.39z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-sage-mist/30">
              <h3 className="text-xl font-serif text-deep-green mb-4">Find the Office</h3>
              <p className="font-sans text-charcoal text-base mb-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

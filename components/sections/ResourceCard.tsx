'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { EmailCaptureModal } from '../ui/EmailCaptureModal';
import { Download } from 'lucide-react';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  gatedByEmail: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ id, title, description, fileUrl, gatedByEmail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    if (gatedByEmail) {
      setIsModalOpen(true);
    } else {
      triggerDownload();
    }
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'resource.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col h-full bg-ivory">
        <div className="flex-grow">
          <h3 className="text-2xl font-serif text-deep-green mb-4">{title}</h3>
          <p className="text-charcoal font-sans leading-relaxed mb-8">{description}</p>
        </div>
        <div className="mt-auto pt-6 border-t border-sage/30">
          <button 
            onClick={handleDownloadClick}
            className="flex items-center text-deep-green font-sans font-medium hover:text-gold transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resource
          </button>
        </div>
      </Card>

      <EmailCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={triggerDownload}
        resourceId={id}
      />
    </>
  );
};

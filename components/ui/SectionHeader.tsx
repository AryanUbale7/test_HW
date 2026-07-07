import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  subtext,
  className = '',
  align = 'left',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="block uppercase tracking-widest text-xs font-semibold font-sans text-charcoal mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-serif text-deep-green mb-6 leading-tight">
        {heading}
      </h2>
      {subtext && (
        <p className="text-lg md:text-xl font-sans text-charcoal leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};

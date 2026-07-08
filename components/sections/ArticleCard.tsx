import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: 'Creation' | 'Protection' | 'Legacy' | 'General';
  href: string;
  thumbnailUrl?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  excerpt, 
  date, 
  category, 
  href, 
  thumbnailUrl 
}) => {
  const categoryColors = {
    Creation: 'bg-sage-mist text-deep-green border-sage',
    Protection: 'bg-ivory text-gold border-gold/30',
    Legacy: 'bg-deep-green text-ivory border-deep-green',
    General: 'bg-transparent text-charcoal border-sage',
  };

  return (
    <article 
      className="group flex flex-col h-full bg-ivory rounded-md border border-sage/30 hover:border-sage overflow-hidden transition-all duration-300"
    >
      <Link href={href} className="flex flex-col h-full">
        {thumbnailUrl && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-sage-mist relative">
            <Image 
              src={thumbnailUrl} 
              alt={title} 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-sm border ${categoryColors[category]}`}>
              {category}
            </span>
            <time className="text-sm font-sans text-charcoal/70">{date}</time>
          </div>
          
          <h3 className="text-xl md:text-2xl font-serif text-deep-green mb-3 group-hover:text-gold transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-charcoal font-sans leading-relaxed line-clamp-3 mb-6 flex-grow">
            {excerpt}
          </p>
          
          <span className="text-sm font-sans font-medium text-deep-green group-hover:text-gold transition-colors mt-auto inline-flex items-center">
            Read article
          </span>
        </div>
      </Link>
    </article>
  );
};

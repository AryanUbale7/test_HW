import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleListItemProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
  thumbnailUrl?: string | null;
  priority?: boolean;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({ title, excerpt, date, category, href, thumbnailUrl, priority }) => {
  return (
    <Link href={href} className="block group" aria-label={`Read article: ${title}`}>
      <div className="py-6 md:py-8 border-b border-sage/20 transition-all duration-500 relative overflow-hidden">
        {/* Subtle hover accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        
        <div className="pl-0 md:group-hover:pl-6 transition-all duration-500 ease-out flex flex-col md:flex-row gap-8 items-center">
          
          <div className="flex-1 w-full order-2 md:order-1">
            <div className="flex items-center gap-3 text-xs font-sans text-charcoal/80 uppercase tracking-[0.2em] mb-4">
              <time className="text-[#CBA32E] font-medium">{date}</time>
              <span className="w-4 h-px bg-sage/50" />
              <span className="text-gold font-medium">{category === 'Creation' ? 'Building' : (category === 'Pers.Fin' ? 'Personal Finance' : category)}</span>
            </div>

            <div className="flex justify-between items-baseline gap-8">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-deep-green mb-4 leading-tight">
                {title}
              </h3>
              <span className="hidden md:block opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-gold text-2xl">
                →
              </span>
            </div>

            <p className="text-base md:text-lg font-sans text-charcoal/80 leading-relaxed max-w-3xl">
              {excerpt}
            </p>
          </div>

          {thumbnailUrl && (
            <div className="w-full md:w-1/3 shrink-0 overflow-hidden rounded-sm aspect-[16/10] relative order-1 md:order-2">
              <Image 
                src={thumbnailUrl} 
                alt={title}
                fill
                priority={priority}
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 30vw, 290px"
                quality={80}
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          )}

        </div>
      </div>
    </Link>
  );
};

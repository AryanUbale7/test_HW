import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', href, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm";
    
    const variants = {
      primary: "bg-deep-green text-ivory hover:bg-deep-green/90 border border-transparent",
      secondary: "bg-transparent border border-deep-green text-deep-green hover:bg-deep-green/10",
      tertiary: "bg-transparent text-deep-green hover:underline underline-offset-4 px-0 py-2",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

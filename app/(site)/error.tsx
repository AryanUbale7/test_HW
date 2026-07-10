'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled site error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-ivory text-center">
      <h2 className="text-3xl font-serif text-deep-green mb-4">Something went wrong</h2>
      <p className="font-sans text-charcoal/80 mb-8 max-w-md leading-relaxed">
        We encountered a connection error. The page may be refreshing in the background, or you can try reloading.
      </p>
      <Button onClick={() => reset()} variant="primary">
        Try Again
      </Button>
    </div>
  );
}

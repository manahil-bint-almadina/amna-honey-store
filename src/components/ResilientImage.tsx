import { useState } from 'react';
import { Hexagon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'auto' | 'low';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
  fetchPriority = 'auto',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emeraldDeep/10 via-honeyGold/10 to-creamBase text-emeraldDeep p-6 text-center ${className}`}
      >
        <Hexagon className="w-10 h-10 text-honeyGold mb-2" strokeWidth={1.5} />
        <span className="font-display text-lg font-bold text-emeraldDeep">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

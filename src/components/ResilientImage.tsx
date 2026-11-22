import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#061329] via-[#0D244D] to-[#15356B] text-[#FAF7F0] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/45 flex items-center justify-center mb-3">
          <GraduationCap className="w-6 h-6 text-[#E3BA59]" aria-hidden="true" />
        </div>
        <p className="font-display text-base font-semibold tracking-tight text-[#FAF7F0]">
          {title || 'Silver Oak Academy'}
        </p>
        <p className="text-xs text-[#FAF7F0]/75 mt-1">Lohardaga, Jharkhand</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

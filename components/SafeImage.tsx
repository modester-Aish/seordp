'use client';

import { useState } from 'react';
import Image from 'next/image';

/** Backend URLs sometimes return HTML (404) instead of image; Next Image then fails. Use unoptimized + onError placeholder. */
function isExternalBackendUrl(src: string): boolean {
  try {
    return /^https?:\/\/(backend\.seordp\.net|app\.faditools\.com)\//i.test(src);
  } catch {
    return false;
  }
}

export interface SafeImageProps extends Omit<React.ComponentProps<typeof Image>, 'onError'> {
  /** Fallback when image fails (e.g. emoji or element) */
  fallback?: React.ReactNode;
}

const DEFAULT_FALLBACK = <span className="text-6xl">📦</span>;

export default function SafeImage({ src, alt, fallback = DEFAULT_FALLBACK, className, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const useUnoptimized = typeof src === 'string' && isExternalBackendUrl(src);
  const useFill = 'fill' in props && props.fill;

  if (error) {
    const wrapperClass = useFill
      ? 'absolute inset-0 flex items-center justify-center bg-slate-800/50 rounded-lg'
      : 'flex items-center justify-center w-full h-full bg-slate-800/50 rounded-lg';
    return <div className={wrapperClass}>{fallback}</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      unoptimized={useUnoptimized}
      onError={() => setError(true)}
      {...props}
    />
  );
}

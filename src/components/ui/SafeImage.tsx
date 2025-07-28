"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { generateAvatarUrl, generatePlaceholderUrl } from '@/lib/utils';

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'src'> {
  src: string;
  fallbackType?: 'avatar' | 'placeholder';
  fallbackSeed?: string;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * SafeImage component that automatically handles broken images with fallbacks
 */
export function SafeImage({
  src,
  alt,
  fallbackType = 'placeholder',
  fallbackSeed,
  onError,
  width,
  height,
  fill,
  ...props
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);

      // Generate fallback based on type
      const fallbackUrl = fallbackType === 'avatar'
        ? generateAvatarUrl(fallbackSeed || alt || 'default')
        : generatePlaceholderUrl(
            typeof width === 'number' ? width : 600,
            typeof height === 'number' ? height : 400,
            fallbackSeed || alt || 'default'
          );

      setImageSrc(fallbackUrl);
    }

    // Call custom error handler if provided
    onError?.(event);
  };

  // Reset error state when src changes
  React.useEffect(() => {
    if (src !== imageSrc && !hasError) {
      setImageSrc(src);
      setHasError(false);
    }
  }, [src, imageSrc, hasError]);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      onError={handleError}
    />
  );
}

/**
 * Avatar component specifically for user profile images
 */
export function Avatar({
  src,
  name,
  size = 40,
  className = '',
  ...props
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'onError'>) {
  const avatarSrc = src || generateAvatarUrl(name);

  return (
    <SafeImage
      src={avatarSrc}
      alt={`${name}'s avatar`}
      width={size}
      height={size}
      fallbackType="avatar"
      fallbackSeed={name}
      className={`rounded-full ${className}`}
      {...props}
    />
  );
}

/**
 * ProjectImage component specifically for project images
 */
export function ProjectImage({
  src,
  title,
  className = '',
  ...props
}: {
  src: string;
  title: string;
  className?: string;
} & Omit<ImageProps, 'alt' | 'src' | 'onError'>) {
  return (
    <SafeImage
      src={src}
      alt={`${title} project screenshot`}
      fallbackType="placeholder"
      fallbackSeed={title}
      className={className}
      {...props}
    />
  );
}

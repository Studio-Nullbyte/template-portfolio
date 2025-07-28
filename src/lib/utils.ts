import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a reliable avatar URL using DiceBear API
 * @param seed - Unique identifier for consistent avatar generation
 * @param style - Avatar style (avataaars, personas, etc.)
 * @param backgroundColor - Background color (hex without #)
 * @param size - Image size in pixels
 * @returns URL string for the avatar
 */
export function generateAvatarUrl(
  seed: string,
  style: 'avataaars' | 'personas' | 'initials' = 'avataaars',
  backgroundColor: string = '4f46e5',
  size: number = 100
): string {
  const baseUrl = 'https://api.dicebear.com/7.x';
  const params = new URLSearchParams({
    seed,
    backgroundColor,
    radius: '50',
    size: size.toString()
  });

  return `${baseUrl}/${style}/svg?${params.toString()}`;
}

/**
 * Generate a placeholder image URL using Picsum for project images
 * @param width - Image width
 * @param height - Image height
 * @param seed - Optional seed for consistent image
 * @returns URL string for the placeholder image
 */
export function generatePlaceholderUrl(
  width: number = 600,
  height: number = 400,
  seed?: string
): string {
  const baseUrl = 'https://picsum.photos';
  const seedParam = seed ? `/seed/${seed}` : '';
  return `${baseUrl}${seedParam}/${width}/${height}`;
}

/**
 * Generate a fallback image URL with error handling
 * @param primaryUrl - Primary image URL to try
 * @param fallbackSeed - Seed for generating fallback image
 * @param type - Type of fallback (avatar or placeholder)
 * @returns Primary URL with fallback handling
 */
export function getImageWithFallback(
  primaryUrl: string,
  fallbackSeed: string,
  type: 'avatar' | 'placeholder' = 'avatar',
  dimensions: { width?: number; height?: number } = {}
): string {
  // In a real implementation, you might want to test the primary URL
  // For now, we'll return the primary URL but have the fallback ready

  if (!primaryUrl || primaryUrl.includes('404') || primaryUrl.includes('error')) {
    if (type === 'avatar') {
      return generateAvatarUrl(fallbackSeed);
    } else {
      return generatePlaceholderUrl(dimensions.width, dimensions.height, fallbackSeed);
    }
  }

  return primaryUrl;
}

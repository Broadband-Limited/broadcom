import { NextResponse } from 'next/server';

type CacheConfigType = {
  maxAge: number;
  staleWhileRevalidate?: number;
  isPublic?: boolean;
};

export const DEFAULT_CACHE_CONFIG: CacheConfigType = {
  maxAge: 60, // 1 minute
  staleWhileRevalidate: 300, // 5 minutes
  isPublic: true,
};

export const CACHE_CONFIGS = {
  divisions: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 7200, // 2 hours
    isPublic: true,
  },
  products: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 7200, // 2 hours
    isPublic: true,
  },
  careers: {
    maxAge: 1800, // 30 minutes
    staleWhileRevalidate: 3600, // 1 hour
    isPublic: true,
  },
  jobDetails: {
    maxAge: 900, // 15 minutes
    staleWhileRevalidate: 1800, // 30 minutes
    isPublic: true,
  },
  media: {
    maxAge: 1800, // 30 minutes
    staleWhileRevalidate: 3600, // 1 hour
    isPublic: true,
  },
};

export function applyCacheHeaders(
  response: NextResponse,
  cacheConfig: CacheConfigType = DEFAULT_CACHE_CONFIG
): NextResponse {
  const { maxAge, staleWhileRevalidate, isPublic } = cacheConfig;

  const cacheControl = [
    isPublic ? 'public' : 'private',
    `max-age=${maxAge}`,
    staleWhileRevalidate
      ? `stale-while-revalidate=${staleWhileRevalidate}`
      : '',
  ]
    .filter(Boolean)
    .join(', ');

  response.headers.set('Cache-Control', cacheControl);

  return response;
}

export function handleApiResponse<T>(
  data: T,
  cacheKey: keyof typeof CACHE_CONFIGS | null = null,
  customCacheConfig?: CacheConfigType
): NextResponse {
  const config = cacheKey
    ? CACHE_CONFIGS[cacheKey]
    : customCacheConfig || DEFAULT_CACHE_CONFIG;

  const response = NextResponse.json(data);
  return applyCacheHeaders(response, config);
}

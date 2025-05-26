import { NextRequest, NextResponse } from 'next/server';
import { createMedia } from '@/lib/db/media';
import { handleApiResponse } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    // Get media data from request body
    const mediaData = await request.json();

    // Create the media item
    const newMedia = await createMedia(mediaData);

    // Return response with proper caching headers
    return handleApiResponse({ success: true, media: newMedia }, 'media', {
      maxAge: 0, // Don't cache creation responses
      staleWhileRevalidate: 0,
      isPublic: false,
    });
  } catch (error) {
    console.error('Error creating media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create media item' },
      { status: 500 }
    );
  }
}

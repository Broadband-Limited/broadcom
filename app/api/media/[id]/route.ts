import { NextRequest, NextResponse } from 'next/server';
import { getMediaById, updateMedia } from '@/lib/db/media';
import { Media } from '@/lib/types/media_types';
import { handleApiResponse } from '@/lib/cache';

// GET handler for retrieving a single media item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { data, error } = await getMediaById((await params).id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return handleApiResponse({ success: true, data }, null, {
      maxAge: 60, // Cache for 1 minute
      staleWhileRevalidate: 300,
      isPublic: false,
    });
  } catch (error) {
    console.error('Error fetching media item:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch media item',
      },
      { status: 500 }
    );
  }
}

// PUT handler for updating a media item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const mediaData: Partial<Media> = await request.json();
    const updatedMedia = await updateMedia((await params).id, mediaData);

    return handleApiResponse({ success: true, media: updatedMedia }, null, {
      maxAge: 0, // Don't cache update responses
      staleWhileRevalidate: 0,
      isPublic: false,
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update media item',
      },
      { status: 500 }
    );
  }
}

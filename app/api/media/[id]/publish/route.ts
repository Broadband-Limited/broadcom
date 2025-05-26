import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { updateMediaPublishStatus } from '@/lib/db/media';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check authorization
    const requiredRoles = ['admin', 'editor'];
    const authorised = await isAuthorised(requiredRoles);
    if (!authorised) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Validate request body
    const body = await request.json();
    const { published } = body;

    if (typeof published !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid published status. Must be boolean.' },
        { status: 400 }
      );
    }

    // Validate media ID
    const mediaId = (await params).id;
    if (!mediaId || typeof mediaId !== 'string') {
      return NextResponse.json({ error: 'Invalid media ID' }, { status: 400 });
    }

    // Update the media item's publish status
    const { data: updatedMedia, error } = await updateMediaPublishStatus(
      mediaId,
      published
    );

    if (error) {
      console.error('Error updating media publish status:', error);
      return NextResponse.json(
        { error: 'Failed to update media publish status' },
        { status: 500 }
      );
    }

    if (!updatedMedia) {
      return NextResponse.json(
        { error: 'Media item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Media item ${
        published ? 'published' : 'unpublished'
      } successfully`,
      data: updatedMedia,
    });
  } catch (error) {
    console.error('Error in PATCH /api/media/[id]/publish:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

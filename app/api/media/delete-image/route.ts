import { NextRequest, NextResponse } from 'next/server';
import { deleteMediaImage } from '@/lib/media-storage';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';

export async function DELETE(request: NextRequest) {
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

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    await deleteMediaImage(url);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

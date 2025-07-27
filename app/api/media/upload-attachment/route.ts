import { NextRequest, NextResponse } from 'next/server';
import { uploadMediaAttachment } from '@/lib/media-storage';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    const result = await uploadMediaAttachment(file);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Upload attachment error:', error);
    return NextResponse.json(
      { error: 'Failed to upload attachment' },
      { status: 500 }
    );
  }
}

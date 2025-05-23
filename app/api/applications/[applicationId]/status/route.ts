import { NextResponse } from 'next/server';
import { updateApplicationStatus } from '@/lib/db/applications';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { ApplicationStatus } from '@/lib/types/career_types';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    // Check authentication and authorization
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requiredRoles = ['admin', 'editor'];
    const authorised = await isAuthorised(requiredRoles);
    if (!authorised) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { applicationId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }
    const validStatuses = [
      'applied',
      'screening',
      'interview',
      'offer',
      'rejected',
      'withdrawn',
    ];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required' },
        { status: 400 }
      );
    }

    const { data, error } = await updateApplicationStatus(
      applicationId,
      status as ApplicationStatus
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

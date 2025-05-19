import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import {
  getDivisionById,
  updateDivision,
  deleteDivision,
} from '@/lib/db/divisions';
import { Division } from '@/lib/types/divisions_types';

// GET /api/divisions/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await getDivisionById(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch division', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: 'Division not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in GET /api/divisions/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PUT /api/divisions/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authorization check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const authorised = await isAuthorised(['admin', 'editor']);
    if (!authorised) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.slug || !body.description) {
      return NextResponse.json(
        { message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }

    const division: Partial<Division> = {
      name: body.name,
      slug: body.slug,
      description: body.description,
    };

    const { data, error } = await updateDivision(id, division);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to update division', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in PUT /api/divisions/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// DELETE /api/divisions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authorization check
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const authorised = await isAuthorised(['admin']);
    if (!authorised) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const id = (await params).id;

    const { error } = await deleteDivision(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to delete division', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error in DELETE /api/divisions/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

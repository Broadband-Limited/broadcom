import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import {
  getServiceById,
  updateService,
  deleteService,
} from '@/lib/db/services';
import { Service } from '@/lib/types/divisions_types';

// GET /api/services/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await getServiceById(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch service', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in GET /api/services/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id]
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

    const id = (await params).id;
    const body = await request.json();

    // Basic validation
    if (
      !body.division_id ||
      !body.title ||
      !body.slug ||
      !body.description ||
      !Array.isArray(body.details) ||
      !body.images
    ) {
      return NextResponse.json(
        {
          message:
            'All fields are required (division_id, title, slug, description, details, images)',
        },
        { status: 400 }
      );
    }

    const service: Partial<Service> = {
      division_id: body.division_id,
      title: body.title,
      slug: body.slug,
      description: body.description,
      details: body.details,
      images: body.images,
    };

    const { data, error } = await updateService(id, service);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to update service', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in PUT /api/services/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id]
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

    const { error } = await deleteService(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to delete service', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error in DELETE /api/services/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

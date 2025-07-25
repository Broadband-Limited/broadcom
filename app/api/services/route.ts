import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { createService, getAllServices } from '@/lib/db/services';
import { Service } from '@/lib/types/divisions_types';

// GET /api/services - Get all services
export async function GET() {
  try {
    // No auth check needed for listing services
    const { data, error } = await getAllServices();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch services', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/services:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    // Basic validation - category_id is optional
    if (
      !body.division_id ||
      !body.title ||
      !body.slug ||
      !body.description ||
      !Array.isArray(body.details) ||
      !Array.isArray(body.images)
    ) {
      return NextResponse.json(
        {
          message:
            'Required fields: division_id, title, slug, description, details (array), images (array)',
        },
        { status: 400 }
      );
    }

    // Validate category_id if provided
    if (
      body.category_id !== undefined &&
      body.category_id !== null &&
      typeof body.category_id !== 'string'
    ) {
      return NextResponse.json(
        { message: 'category_id must be a string or null' },
        { status: 400 }
      );
    }

    const service: Service = {
      division_id: body.division_id,
      category_id: body.category_id || undefined, // Convert empty string to undefined
      title: body.title,
      slug: body.slug,
      description: body.description,
      details: body.details,
      images: body.images,
    };

    const { data, error } = await createService(service);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to create service', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/services:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

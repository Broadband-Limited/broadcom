import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { createDivision, getDivisions } from '@/lib/db/divisions';
import { Division } from '@/lib/types/divisions_types';

// GET /api/divisions - Get all divisions
export async function GET() {
  try {
    // No auth check needed for listing divisions
    const { data, error } = await getDivisions();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch divisions', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/divisions:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/divisions - Create a new division
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

    // Basic validation
    if (!body.name || !body.slug || !body.description) {
      return NextResponse.json(
        { message: 'Name, slug, and description are required' },
        { status: 400 }
      );
    }

    const division: Division = {
      name: body.name,
      slug: body.slug,
      description: body.description,
    };

    const { data, error } = await createDivision(division);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to create division', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/divisions:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

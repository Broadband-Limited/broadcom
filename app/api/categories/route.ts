import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { createCategory, getCategoriesByDivisionId } from '@/lib/db/categories';
import { Category } from '@/lib/types/divisions_types';

// GET /api/categories?divisionId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const divisionId = searchParams.get('divisionId');

    if (!divisionId) {
      return NextResponse.json(
        { message: 'Division ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await getCategoriesByDivisionId(divisionId);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch categories', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/categories
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
    if (!body.name || !body.slug || !body.division_id) {
      return NextResponse.json(
        { message: 'Name, slug, and division_id are required' },
        { status: 400 }
      );
    }

    const category: Category = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      division_id: body.division_id,
    };

    const { data, error } = await createCategory(category);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to create category', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/categories:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

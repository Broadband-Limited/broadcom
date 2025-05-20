import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { createPartner, getPartners } from '@/lib/db/partners';
import { Partner } from '@/lib/types/partner_types';

// GET /api/partners - Get all partners
export async function GET() {
  try {
    // No auth check needed for listing partners
    const { data, error } = await getPartners();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch partners', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/partners:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/partners - Create a new partner
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
    if (!body.name || !body.image || !body.description || !body.link) {
      return NextResponse.json(
        { message: 'Name, image, description, and link are required' },
        { status: 400 }
      );
    }

    // Create slug from name if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }

    const partner: Partner = {
      name: body.name,
      slug: body.slug,
      image: body.image,
      description: body.description,
      link: body.link,
      rank: body.rank || 0,
    };

    const { data, error } = await createPartner(partner);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to create partner', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/partners:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

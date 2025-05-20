import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import {
  getPartnerById,
  updatePartner,
  deletePartner,
} from '@/lib/db/partners';
import { Partner } from '@/lib/types/partner_types';

// GET /api/partners/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await getPartnerById(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch partner', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: 'Partner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in GET /api/partners/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PUT /api/partners/[id]
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
    if (!body.name || !body.image || !body.description || !body.link) {
      return NextResponse.json(
        { message: 'Name, image, description, and link are required' },
        { status: 400 }
      );
    }

    // Update slug if name has changed
    if (body.name && !body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }

    const partner: Partial<Partner> = {
      name: body.name,
      slug: body.slug,
      image: body.image,
      description: body.description,
      link: body.link,
      rank: body.rank,
    };

    const { data, error } = await updatePartner(id, partner);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to update partner', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in PUT /api/partners/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// DELETE /api/partners/[id]
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

    const { error } = await deletePartner(id);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to delete partner', error: error.message },
        { status: error.code === 'PGRST116' ? 404 : 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error in DELETE /api/partners/${(await params).id}:`, error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

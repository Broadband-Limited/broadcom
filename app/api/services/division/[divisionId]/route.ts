import { NextRequest, NextResponse } from 'next/server';
import { getServicesByDivisionId } from '@/lib/db/services';

// GET /api/services/division/[divisionId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ divisionId: string }> }
) {
  try {
    const { divisionId } = await params;

    if (!divisionId) {
      return NextResponse.json(
        { message: 'Division ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await getServicesByDivisionId(divisionId);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch services', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error(
      `Error in GET /api/services/division/${(await params).divisionId}:`,
      error
    );
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

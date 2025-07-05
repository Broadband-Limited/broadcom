import { NextRequest, NextResponse } from 'next/server';
import { getServicesByCategoryId } from '@/lib/db/services';

// GET /api/services/category/[categoryId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params;

    if (!categoryId) {
      return NextResponse.json(
        { message: 'Category ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await getServicesByCategoryId(categoryId);

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch services', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error(
      `Error in GET /api/services/category/${(await params).categoryId}:`,
      error
    );
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

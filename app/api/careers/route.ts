import { NextRequest, NextResponse } from 'next/server';
import { handleApiResponse } from '@/lib/cache';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const id = searchParams.get('id');

    let query = supabase.from('jobs').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (location) {
      query = query.eq('location', location);
    }

    if (id) {
      query = query.eq('id', id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      // Use NextResponse directly to avoid cookie access during static generation
      return NextResponse.json(
        { error: 'Failed to fetch job listings' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.warn(
        `No job listings found with params: category=${category}, location=${location}, id=${id}`
      );
      // Return empty jobs array without relying on cookie-based caching
      return NextResponse.json({ jobs: [] }, { status: 200 });
    }

    // Check if we're in a static generation context
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      // During static generation, don't use handleApiResponse which may access cookies
      return NextResponse.json({ jobs: data }, { status: 200 });
    }

    // During regular request handling, use handleApiResponse for caching
    return handleApiResponse({ jobs: data }, 'careers');
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest } from 'next/server';
import { handleApiResponse } from '@/lib/cache';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const id = searchParams.get('id');

    let query = supabase.from('job_postings').select('*');

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
      return handleApiResponse(
        { error: 'Failed to fetch job listings' },
        null,
        { maxAge: 60, isPublic: true }
      );
    }

    if (!data || data.length === 0) {
      console.warn(
        `No job listings found with params: category=${category}, location=${location}, id=${id}`
      );
      return handleApiResponse({ jobs: [] }, 'careers', {
        maxAge: 60,
        isPublic: true,
      });
    }

    return handleApiResponse({ jobs: data }, 'careers');
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return handleApiResponse({ error: 'Internal server error' }, null, {
      maxAge: 0,
      isPublic: false,
    });
  }
}

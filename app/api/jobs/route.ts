import { createServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { createJob } from '@/lib/db/jobs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const supabase = await createServer();

    let query = supabase.from('jobs').select('*');

    // Add filters if present in query params
    const location = url.searchParams.get('location');
    if (location) {
      query = query.eq('location', location);
    }

    const department = url.searchParams.get('department');
    if (department) {
      query = query.eq('department', department);
    }

    const employmentType = url.searchParams.get('employment_type');
    if (employmentType) {
      query = query.eq('employment_type', employmentType);
    }

    const experienceLevel = url.searchParams.get('experience_level');
    if (experienceLevel) {
      query = query.eq('experience_level', experienceLevel);
    }

    const isRemote = url.searchParams.get('is_remote');
    if (isRemote) {
      query = query.eq('is_remote', isRemote === 'true');
    }

    // Sort results
    query = query.order('posted_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication and authorization
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requiredRoles = ['admin', 'editor'];
    const authorised = await isAuthorised(requiredRoles);
    if (!authorised) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      description,
      location,
      department,
      employment_type,
      is_remote,
      requirements,
      benefits,
      application_deadline,
      experience_level,
      salary_min,
      salary_max,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !location ||
      !department ||
      !employment_type ||
      is_remote === undefined ||
      !requirements
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await createJob({
      title,
      description,
      location,
      department,
      employment_type,
      is_remote,
      requirements,
      benefits,
      application_deadline,
      experience_level,
      salary_min,
      salary_max,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

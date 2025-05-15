import { NextRequest, NextResponse } from 'next/server';
import { getJobs, createJob } from '@/lib/jobs';

// GET /api/jobs
export async function GET() {
  try {
    const jobs = await getJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST /api/jobs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, location, department } = body;
    if (!title || !description || !location || !department) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: title, description, location, department',
        },
        { status: 400 }
      );
    }
    const job = await createJob({ title, description, location, department });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

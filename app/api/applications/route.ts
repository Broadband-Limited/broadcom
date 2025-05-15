import { NextResponse } from 'next/server';
import { createServiceRoleServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { job_id, name, email, cover_letter, resume } = body;
    if (
      !job_id ||
      !name ||
      !email ||
      !resume?.fileName ||
      !resume?.fileType ||
      !resume?.fileBase64
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleServer();
    const fileBuffer = Buffer.from(resume.fileBase64, 'base64');
    const filePath = `${Date.now()}_${resume.fileName}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, fileBuffer, {
        contentType: resume.fileType,
        upsert: false,
      });
    
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const publicUrl = supabase.storage
      .from('resumes')
      .getPublicUrl(uploadData.path).data.publicUrl;
    
    const { data: appData, error: appError } = await supabase
      .from('applications')
      .insert({ job_id, name, email, resume: publicUrl, cover_letter })
      .select()
      .single();
    
    if (appError) {
      return NextResponse.json({ error: appError.message }, { status: 500 });
    }

    return NextResponse.json(appData);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

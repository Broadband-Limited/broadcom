import { NextResponse } from 'next/server';
import { createServiceRoleServer } from '@/lib/supabase/server';
import emailjs from '@emailjs/nodejs';

// Initialize Email.js with environment variables
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      job_id,
      name,
      email,
      phone,
      cover_letter,
      linkedin_url,
      portfolio_url,
      referral_source,
      skills,
      notes,
      resume,
    } = body;

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

    // Upload resume file
    const fileBuffer = Buffer.from(resume.fileBase64, 'base64');
    const timestamp = Date.now();
    const fileNameParts = resume.fileName.split('.');
    const extension = fileNameParts.length > 1 ? fileNameParts.pop() : '';
    const baseName = fileNameParts.join('.');
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    const filePath = `${sanitizedBaseName}_${timestamp}.${extension}`;

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

    // Insert application record
    const { data: appData, error: appError } = await supabase
      .from('applications')
      .insert({
        job_id,
        name,
        email,
        phone,
        resume: publicUrl,
        cover_letter,
        linkedin_url,
        portfolio_url,
        referral_source,
        skills,
        notes,
        status: 'applied',
      })
      .select()
      .single();

    if (appError) {
      return NextResponse.json({ error: appError.message }, { status: 500 });
    }

    // After successful database insertion, send email notification
    try {
      // Get job details for the email
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('title, department')
        .eq('id', job_id)
        .single();

      if (jobError) {
        console.error('Error fetching job details for email:', jobError);
      } else {
        // Send email notification
        await emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_TEMPLATE_ID!,
          {
            job_title: jobData.title,
            job_department: jobData.department,
            applicant_name: name,
            applicant_email: email,
            applicant_phone: phone || 'Not provided',
            application_date: new Date().toLocaleString(),
            application_id: appData.id,
            resume_link: publicUrl,
            skills: Array.isArray(skills) ? skills.join(', ') : 'Not provided',
          }
        );
        console.log('Email notification sent successfully');
      }
    } catch (emailError) {
      // Log error but don't fail the application process
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json(appData);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

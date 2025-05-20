// app/api/upload-service-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const uniqueId = uuidv4();
    const filePath = `${uniqueId}_${file.name}`;

    const supabase = await createServer();
    const { data, error } = await supabase.storage
      .from('services')
      .upload(filePath, buffer, {
        cacheControl: '86400',
        upsert: false,
      });

    if (error) throw error;

    // return full public URL if you like:
    const publicUrl = supabase.storage.from('services').getPublicUrl(data.path)
      .data.publicUrl;

    return NextResponse.json({ path: data.path, publicUrl });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

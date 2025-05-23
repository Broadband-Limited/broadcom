import { createServer } from '@/lib/supabase/server';
import { Media } from '@/lib/types/media_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';

export const getMediaCount = async () => {
  const supabase = await createServer();
  const { count, error } = await supabase
    .from('media')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);

  if (error) throw error;
  return count;
};

export const getAllMedia = async (includeUnpublished = false) => {
  const supabase = await createServer();
  let query = supabase.from('media').select('*');

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  return query.order('published_at', { ascending: false });
};

export async function getMediaNoAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return { data, error };
}

export async function getAllMediaSlugsNoAuth() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('media')
      .select('slug, published')
      .order('published_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching media slugs:', error);
    return { data: [], error };
  }
}

export const getMediaBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase.from('media').select('*').eq('slug', slug).single();
};

export const getMediaById = async (id: string) => {
  const supabase = await createServer();
  return supabase.from('media').select('*').eq('id', id).single();
};

export const createMedia = async (
  media: Omit<Media, 'id' | 'created_at' | 'updated_at'>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create media');
  }

  const supabase = await createServer();
  return supabase.from('media').insert(media).select('*').single();
};

export const updateMedia = async (
  id: string,
  media: Partial<Omit<Media, 'id' | 'created_at' | 'updated_at'>>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update media');
  }

  const mediaWithUpdatedAt = {
    ...media,
    updated_at: new Date().toISOString(),
  };

  const supabase = await createServer();
  return supabase
    .from('media')
    .update(mediaWithUpdatedAt)
    .eq('id', id)
    .select('*')
    .single();
};

export const deleteMedia = async (id: string) => {
  // Authorization check
  const authorised = await isAuthorised(['admin']);
  if (!authorised) {
    throw new Error('Not authorized to delete media');
  }

  const supabase = await createServer();
  return supabase.from('media').delete().eq('id', id);
};

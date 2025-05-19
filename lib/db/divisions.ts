import { createServer } from '@/lib/supabase/server';
import { Division } from '@/lib/types/divisions_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';

export const getDivisions = async () => {
  const supabase = await createServer();

  return supabase.from('divisions').select('*');
};

export async function getDivisionsNoAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.from('divisions').select('*');
  if (error) throw error;
  return { data, error };
}

export const getDivisionBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase.from('divisions').select('*').eq('slug', slug).single();
};

export const getDivisionById = async (id: string) => {
  const supabase = await createServer();
  return supabase.from('divisions').select('*').eq('id', id).single();
};

export const createDivision = async (division: Division) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create divisions');
  }

  const supabase = await createServer();
  return supabase.from('divisions').insert(division).select('*').single();
};

export const updateDivision = async (
  id: string,
  division: Partial<Division>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update divisions');
  }

  const supabase = await createServer();
  return supabase
    .from('divisions')
    .update(division)
    .eq('id', id)
    .select('*')
    .single();
};

export const deleteDivision = async (id: string) => {
  // Authorization check
  const authorised = await isAuthorised(['admin']);
  if (!authorised) {
    throw new Error('Not authorized to delete divisions');
  }

  const supabase = await createServer();
  return supabase.from('divisions').delete().eq('id', id);
};

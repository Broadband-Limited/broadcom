import { createServer } from '@/lib/supabase/server';
import { Category } from '@/lib/types/divisions_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';

export const getCategoriesByDivisionId = async (divisionId: string) => {
  const supabase = await createServer();
  return supabase
    .from('categories')
    .select('*')
    .eq('division_id', divisionId)
    .order('name');
};

export const getCategoriesNoAuth = async (divisionId: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supabase
    .from('categories')
    .select('*')
    .eq('division_id', divisionId)
    .order('name');
};

export const getCategoryById = async (id: string) => {
  const supabase = await createServer();
  return supabase.from('categories').select('*').eq('id', id).single();
};

export const getCategoryBySlug = async (slug: string, divisionId: string) => {
  const supabase = await createServer();
  return supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('division_id', divisionId)
    .single();
};

export const createCategory = async (category: Category) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create categories');
  }

  const supabase = await createServer();
  return supabase.from('categories').insert(category).select('*').single();
};

export const updateCategory = async (
  id: string,
  category: Partial<Category>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update categories');
  }

  const supabase = await createServer();
  return supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select('*')
    .single();
};

export const deleteCategory = async (id: string) => {
  // Authorization check
  const authorised = await isAuthorised(['admin']);
  if (!authorised) {
    throw new Error('Not authorized to delete categories');
  }

  const supabase = await createServer();
  return supabase.from('categories').delete().eq('id', id);
};

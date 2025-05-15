import { createServer } from '@/lib/supabase/server';

export const getAllServices = async () => {
  const supabase = await createServer();
  return supabase.from('services').select('*');
};

export const getServiceBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase
    .from('services')
    .select('*, divisions(*)')
    .eq('slug', slug)
    .single();
};
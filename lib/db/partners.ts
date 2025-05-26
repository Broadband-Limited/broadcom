import { createServer } from '@/lib/supabase/server';
import { Partner } from '@/lib/types/partner_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';
import { deletePartnerImage } from '@/lib/storage';

export const getPartnersCount = async () => {
  const supabase = await createServer();
  const { count, error } = await supabase
    .from('partners')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count;
};

export const getPartners = async () => {
  const supabase = await createServer();
  return supabase.from('partners').select('*');
};

export async function getPartnersNoAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.from('partners').select('*');
  if (error) throw error;
  return { data, error };
}

export const getPartnerBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase.from('partners').select('*').eq('slug', slug).single();
};

export const getPartnerById = async (id: string) => {
  const supabase = await createServer();
  return supabase.from('partners').select('*').eq('id', id).single();
};

export const createPartner = async (partner: Partner) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create partners');
  }

  const supabase = await createServer();
  return supabase.from('partners').insert(partner).select('*').single();
};

export const updatePartner = async (id: string, partner: Partial<Partner>) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update partners');
  }

  const supabase = await createServer();
  return supabase
    .from('partners')
    .update(partner)
    .eq('id', id)
    .select('*')
    .single();
};

export const deletePartner = async (id: string) => {
  // Authorization check
  const authorised = await isAuthorised(['admin']);
  if (!authorised) {
    throw new Error('Not authorized to delete partners');
  }

  const supabase = await createServer();

  // Get the partner record first to retrieve the image path
  const { data: partner, error: fetchError } = await supabase
    .from('partners')
    .select('image')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  // Delete the partner image if it exists
  if (partner?.image) {
    try {
      await deletePartnerImage(partner.image);
    } catch (imageError) {
      console.error('Error deleting partner image:', imageError);
      // Continue with deletion even if image deletion fails
    }
  }

  return supabase.from('partners').delete().eq('id', id);
};

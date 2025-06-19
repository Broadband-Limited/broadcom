import { createServer } from '@/lib/supabase/server';
import { Service } from '@/lib/types/divisions_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';
import { deleteMultipleServiceImages } from '@/lib/storage';

export const getServicesCount = async () => {
  const supabase = await createServer();
  const { count, error } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count;
};

export const getAllServices = async () => {
  const supabase = await createServer();
  return supabase.from('services').select('*');
};

export async function getServicesNoAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.from('services').select('*');
  if (error) throw error;
  return { data, error };
}

export const getServicesByDivisionId = async (divisionId: string) => {
  const supabase = await createServer();
  return supabase.from('services').select('*').eq('division_id', divisionId);
};

export const getServiceBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase
    .from('services')
    .select('*, divisions(*)')
    .eq('slug', slug)
    .single();
};

export const getServiceById = async (id: string) => {
  const supabase = await createServer();
  return supabase
    .from('services')
    .select('*, divisions(*)')
    .eq('id', id)
    .single();
};

export const createService = async (service: Service) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create services');
  }

  const supabase = await createServer();
  return supabase.from('services').insert(service).select('*').single();
};

export const updateService = async (id: string, service: Partial<Service>) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update services');
  }

  const supabase = await createServer();
  return supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select('*')
    .single();
};

export const deleteService = async (id: string) => {
  // Authorization check
  const authorised = await isAuthorised(['admin']);
  if (!authorised) {
    throw new Error('Not authorized to delete services');
  }

  const supabase = await createServer();

  // Get the service record first to retrieve the image paths
  const { data: service, error: fetchError } = await supabase
    .from('services')
    .select('images')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  // Delete the service images if they exist
  if (service?.images && service.images.length > 0) {
    try {
      await deleteMultipleServiceImages(service.images);
    } catch (imageError) {
      console.error('Error deleting service images:', imageError);
      // Continue with deletion even if image deletion fails
    }
  }

  return supabase.from('services').delete().eq('id', id);
};

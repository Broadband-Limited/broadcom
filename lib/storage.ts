import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Resume handling for job applications
export const uploadResume = async (file: File) => {
  const uniqueId = uuidv4();
  const filePath = `${uniqueId}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file, {
      cacheControl: '86400',
      upsert: false,
    });

  if (error) throw error;
  return data.path;
};

export const getResumeUrl = (path: string) => {
  return supabase.storage.from('resumes').getPublicUrl(path).data.publicUrl;
};

export const downloadResume = async (path: string) => {
  return supabase.storage.from('resumes').download(path);
};

// Service image handling
export const uploadServiceImage = async (file: File) => {
  const uniqueId = uuidv4();
  const filePath = `${uniqueId}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('services')
    .upload(filePath, file, {
      cacheControl: '86400',
      upsert: false,
    });

  if (error) throw error;
  return data.path;
};

export const getServiceImageUrl = (path: string) => {
  return supabase.storage.from('services').getPublicUrl(path).data.publicUrl;
};

export const deleteServiceImage = async (path: string) => {
  const { error } = await supabase.storage.from('services').remove([path]);
  if (error) throw error;
  return true;
};

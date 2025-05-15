import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadResume = async (file: File) => {
  const uniqueId = uuidv4();
  const filePath = `${uniqueId}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file, {
      cacheControl: '86400', // Increased to 24 hours for better caching
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

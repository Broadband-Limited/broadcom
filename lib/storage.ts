import { supabase } from '@/lib/supabase/client';

export const uploadResume = async (file: File) => {
  const filePath = `${Date.now()}_${file.name}`;
  // TODO: generate a more unique uuid

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
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

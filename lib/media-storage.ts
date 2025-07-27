import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from './supabase/server';

// Media image handling
export const uploadMediaImage = async (file: File): Promise<string> => {
  const uniqueId = uuidv4();
  const filePath = `${uniqueId}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const { data, error } = await supabase.storage
    .from('media-images')
    .upload(filePath, file, {
      cacheControl: '31536000', // 1 year
      upsert: false,
    });

  if (error) throw error;

  // Return the public URL
  return supabase.storage.from('media-images').getPublicUrl(data.path).data
    .publicUrl;
};

export const deleteMediaImage = async (url: string): Promise<void> => {
  // Extract the path from the URL
  const path = url.split('media-images/')[1];
  if (!path) throw new Error('Invalid image URL');

  const supabase = await createServer();

  const { error } = await supabase.storage.from('media-images').remove([path]);

  if (error) throw error;
};

export const deleteMultipleMediaImages = async (urls: string[]) => {
  const supabase = await createServer();

  const paths = urls.map((url) => {
    const path = url.split('media-images/')[1];
    if (!path) throw new Error('Invalid image URL');
    return path;
  });

  const { error } = await supabase.storage.from('media-images').remove(paths);

  console.log('>>> Deleted media images:', paths);

  if (error) throw error;
};

// PDF attachment handling
export const uploadMediaAttachment = async (
  file: File
): Promise<{ url: string; name: string; size: number }> => {
  const supabase = await createServer();
  const uniqueId = uuidv4();
  const filePath = `${uniqueId}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const { data, error } = await supabase.storage
    .from('media-attachments')
    .upload(filePath, file, {
      cacheControl: '31536000', // 1 year
      upsert: false,
    });

  if (error) throw error;

  // Return the public URL and original filename
  return {
    url: supabase.storage.from('media-attachments').getPublicUrl(data.path).data
      .publicUrl,
    name: file.name,
    size: file.size,
  };
};

export const uploadMultipleMediaAttachments = async (
  files: File[]
): Promise<{ url: string; name: string; size: number }[]> => {
  const uploadPromises = files.map((file) => uploadMediaAttachment(file));
  return Promise.all(uploadPromises);
};

export const deleteMultipleMediaAttachments = async (
  urls: string[]
): Promise<void> => {
  const supabase = await createServer();

  const paths = urls.map((url) => {
    const path = url.split('media-attachments/')[1];
    if (!path) throw new Error('Invalid attachment URL');
    return path;
  });

  const { error } = await supabase.storage
    .from('media-attachments')
    .remove(paths);

  if (error) throw error;
};

export const deleteMediaAttachment = async (url: string): Promise<void> => {
  return deleteMultipleMediaAttachments([url]);
};

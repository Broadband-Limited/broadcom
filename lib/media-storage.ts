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

  const supabase = await createServer()

  const { error } = await supabase.storage.from('media-images').remove([path]);

  if (error) throw error;
};

export const deleteMultipleMediaImages = async (urls: string[]) => {
  const supabase = await createServer()

  const paths = urls.map(url => {
    const path = url.split('media-images/')[1];
    if (!path) throw new Error('Invalid image URL');
    return path;
  });

  const { error } = await supabase
    .storage
    .from('media-images')
    .remove(paths)

  console.log('>>> Deleted media images:', paths);
  
  if (error) throw error
}
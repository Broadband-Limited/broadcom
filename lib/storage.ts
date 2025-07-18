import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from './supabase/server';

/**
 * Resume handling for job applications
 */

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

/**
 * Service image handling
 */
export const uploadServiceImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload-service-image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Upload failed');
  }

  const { path } = await res.json();
  return path;
};

// Upload multiple service images
export const uploadMultipleServiceImages = async (
  files: File[]
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadServiceImage(file));
  return Promise.all(uploadPromises);
};

export const getServiceImageUrl = (path: string) => {
  return supabase.storage.from('services').getPublicUrl(path).data.publicUrl;
};

// Get multiple service image URLs
export const getServiceImageUrls = (paths: string[]): string[] => {
  return paths.map((path) => getServiceImageUrl(path));
};

export const deleteServiceImage = async (path: string) => {
  const supabase = await createServer();
  const { error } = await supabase.storage.from('services').remove([path]);
  if (error) throw error;
  return true;
};

// Delete multiple service images
export const deleteMultipleServiceImages = async (
  paths: string[]
): Promise<void> => {
  const supabase = await createServer();
  const { error } = await supabase.storage.from('services').remove(paths);
  if (error) throw error;
};

/**
 * Partner image handling
 */
export async function uploadPartnerImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload-partner-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload partner image');
  }

  const data = await response.json();
  return data.path;
}

export function getPartnerImageUrl(path: string): string {
  if (!path) return '';

  // If path is already a full URL, return it
  if (path.startsWith('http')) {
    return path;
  }

  // Otherwise, construct the URL from Supabase storage
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partners/${path}`;
}

export async function deletePartnerImage(path: string): Promise<void> {
  if (!path) return;

  const supabase = await createServer();

  const { error } = await supabase.storage.from('partners').remove([path]);
  if (error) throw error;
}

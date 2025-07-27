import { createServer } from '@/lib/supabase/server';
import { Media } from '@/lib/types/media_types';
import { isAuthorised } from './auth';
import { createClient } from '@supabase/supabase-js';
import {
  deleteMultipleMediaImages,
  deleteMultipleMediaAttachments,
} from '@/lib/media-storage';

export const getMediaCount = async () => {
  const supabase = await createServer();
  const { count, error } = await supabase
    .from('media')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);

  if (error) throw error;
  return count;
};

export const getAllMedia = async (includeUnpublished = false) => {
  const supabase = await createServer();
  let query = supabase.from('media').select('*');

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  return query.order('published_at', { ascending: false });
};

export async function getMediaNoAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return { data, error };
}

export async function getAllMediaSlugsNoAuth() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('media')
      .select('slug, published')
      .order('published_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching media slugs:', error);
    return { data: [], error };
  }
}

export const getMediaBySlug = async (slug: string) => {
  const supabase = await createServer();
  return supabase.from('media').select('*').eq('slug', slug).single();
};

export const getMediaById = async (id: string) => {
  const supabase = await createServer();
  return supabase.from('media').select('*').eq('id', id).single();
};

export const createMedia = async (
  media: Omit<Media, 'id' | 'created_at' | 'updated_at'>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to create media');
  }

  const supabase = await createServer();
  return supabase.from('media').insert(media).select('*').single();
};

export const updateMedia = async (
  id: string,
  media: Partial<Omit<Media, 'id' | 'created_at' | 'updated_at'>>
) => {
  // Authorization check
  const authorised = await isAuthorised(['admin', 'editor']);
  if (!authorised) {
    throw new Error('Not authorized to update media');
  }

  const mediaWithUpdatedAt = {
    ...media,
    updated_at: new Date().toISOString(),
  };

  const supabase = await createServer();
  return supabase
    .from('media')
    .update(mediaWithUpdatedAt)
    .eq('id', id)
    .select('*')
    .single();
};

export async function deleteMedia(id: string) {
  try {
    // Authorization check
    const authorised = await isAuthorised(['admin']);
    if (!authorised) {
      throw new Error('Not authorized to delete media');
    }

    const supabase = await createServer();

    // Get the media record first to retrieve image URLs and attachments
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('featured_image, content, attachments')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching media:', fetchError);
      return { error: fetchError };
    }

    // Extract image URLs from content
    const extractImageUrls = (content: string): string[] => {
      if (!content) return [];

      const imageUrls: string[] = [];

      // Extract from HTML img tags
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        imageUrls.push(match[1]);
      }

      // Extract from Markdown image syntax
      const mdImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
      while ((match = mdImageRegex.exec(content)) !== null) {
        imageUrls.push(match[1]);
      }

      return imageUrls;
    };

    // Collect all images to delete
    const imagesToDelete: string[] = [];

    if (media?.featured_image) {
      imagesToDelete.push(media.featured_image);
    }

    if (media?.content) {
      const contentImages = extractImageUrls(media.content);
      imagesToDelete.push(...contentImages);
    }

    // Collect all attachments to delete
    const attachmentsToDelete: string[] = [];
    if (media?.attachments && Array.isArray(media.attachments)) {
      media.attachments.forEach((attachment) => {
        if (attachment.url) {
          attachmentsToDelete.push(attachment.url);
        }
      });
    }

    // Delete all images
    if (imagesToDelete.length > 0) {
      try {
        await deleteMultipleMediaImages(imagesToDelete);
        console.log('>>> Deleted media images:', imagesToDelete.length);
      } catch (error) {
        console.error('Error deleting media images:', error);
      }
    }

    // Delete all attachments
    if (attachmentsToDelete.length > 0) {
      try {
        await deleteMultipleMediaAttachments(attachmentsToDelete);
        console.log(
          '>>> Deleted media attachments:',
          attachmentsToDelete.length
        );
      } catch (error) {
        console.error('Error deleting media attachments:', error);
      }
    }

    const { error } = await supabase.from('media').delete().eq('id', id);

    if (error) {
      console.error('Error deleting media:', error);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error('Error deleting media:', error);
    return { error };
  }
}

export async function updateMediaPublishStatus(
  mediaId: string,
  published: boolean
) {
  try {
    const supabase = await createServer();

    const { data, error } = await supabase
      .from('media')
      .update({
        published: published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', mediaId)
      .select('*')
      .single();

    if (error) {
      console.error('Database error updating media publish status:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error updating media publish status:', error);
    return { data: null, error };
  }
}

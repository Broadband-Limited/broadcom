import { getAllMediaSlugsNoAuth, getMediaBySlug } from '@/lib/db/media';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { Download, FileText } from 'lucide-react';
import Button from '@/shared/components/ui/Button';
import { MediaAttachment } from '@/lib/types/media_types';
import ShareLinkButton from './components/ShareLinkButton';

interface MediaSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: MediaSlugPageProps): Promise<Metadata> {
  const { data: media } = await getMediaBySlug((await params).slug);

  if (!media) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found',
    };
  }

  // Create a text-only excerpt from content if no summary exists
  let description = media.summary;
  if (!description) {
    // Strip HTML and limit to ~160 characters for meta description
    const textContent = media.content
      .replace(/<[^>]*>/g, '')
      .substring(0, 157)
      .trim();
    description = `${textContent}...`;
  }

  return {
    title: media.title,
    description,
    openGraph: {
      title: media.title,
      description,
      type: 'article',
      publishedTime: media.published_at || media.created_at,
      modifiedTime: media.updated_at,
      images: media.featured_image ? media.featured_image : '',
    },
    twitter: {
      card: 'summary_large_image',
      title: media.title,
      description,
      images: media.featured_image ? media.featured_image : '',
    },
  };
}

// Generate static params for build-time rendering
export async function generateStaticParams() {
  // Use no-auth method to avoid cookies being called
  const { data: mediaItems } = await getAllMediaSlugsNoAuth();

  // Only include published items for static generation
  return (mediaItems || [])
    .filter((item) => item.published)
    .map((item) => ({
      slug: item.slug,
    }));
}

export default async function MediaSlugPage({ params }: MediaSlugPageProps) {
  const { data: media, error } = await getMediaBySlug((await params).slug);

  if (error || !media || !media.published) {
    notFound();
  }

  return (
    <section className="">
      <article className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/media"
            className="text-sm text-primary hover:text-primary-dark">
            ← Back to all articles
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{media.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          <ShareLinkButton slug={media.slug} title={media.title} />
          <span>
            Published on {formatDate(media.published_at || media.created_at)}
          </span>
        </div>
        {media.featured_image && (
          <div className="relative w-full h-80 md:h-96 mb-8 overflow-hidden">
            <Image
              src={media.featured_image}
              alt={media.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        {media.summary && (
          <div className="text-lg text-gray-700 italic mb-8 border-l-4 border-primary pl-4 py-2">
            {media.summary}
          </div>
        )}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: media.content }}
        />

        {/* PDF Attachments Download */}
        {media.attachments && media.attachments.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Downloads</h3>
            <div className="space-y-2">
              {media.attachments.map(
                (attachment: MediaAttachment, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {attachment.displayName || attachment.name}
                        </p>
                      </div>
                    </div>

                    <Button
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}

import { getMediaNoAuth } from '@/lib/db/media';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function MediaPage() {
  const { data: mediaItems, error } = await getMediaNoAuth();

  return (
    <section className="container px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog & News</h1>

      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Failed to load articles
        </div>
      ) : !mediaItems || mediaItems.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-2xl transition-shadow group">
              <Link href={`/media/${item.slug}`} className=''>
                <div className="relative h-48 w-full overflow-hidden">
                  {item.featured_image ? (
                    <Image
                      src={item.featured_image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex flex-col flex-1 p-6 bg-white">
                <Link href={`/media/${item.slug}`} className="block">
                  <h4 className="font-semibold transition-colors mb-2">
                    {item.title}
                  </h4>
                </Link>

                {item.summary && (
                  <p className="text-gray-600 mb-4 flex-1">
                    {item.summary.length > 150
                      ? `${item.summary.substring(0, 150)}...`
                      : item.summary}
                  </p>
                )}

                <div className="mt-auto">
                  <div className="text-sm text-gray-500">
                    {formatDate(item.published_at || item.created_at)}
                  </div>

                  <Link
                    href={`/media/${item.slug}`}
                    className="inline-flex mt-2 text-sm font-medium text-primary hover:text-primary-dark">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

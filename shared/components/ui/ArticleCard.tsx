import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface Media {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  featured_image?: string;
  published_at?: string;
  created_at: string;
}

interface ArticleCardProps {
  item: Media;
  compact?: boolean;
}

export default function ArticleCard({
  item,
  compact = false,
}: ArticleCardProps) {
  return (
    <article
      className={`flex flex-col overflow-hidden shadow hover:shadow-2xl transition-all group ${
        compact ? 'shadow-sm' : ''
      }`}>
      <Link href={`/media/${item.slug}`} className="">
        <div
          className={`relative w-full overflow-hidden ${
            compact ? 'h-32' : 'h-48'
          }`}>
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

      <div
        className={`flex flex-col flex-1 bg-light-blue/10 ${
          compact ? 'p-3' : 'p-4'
        }`}>
        <Link href={`/media/${item.slug}`} className="block">
          <h5
            title={item.title}
            className={`font-semibold !font-montserrat text-dark-blue transition-colors mb-2 line-clamp-3 ${
              compact ? 'text-xs' : 'text-sm'
            }`}>
            {item.title}
          </h5>
        </Link>

        {item.summary && !compact && (
          <p className="mb-4 flex-1 !text-sm line-clamp-3">{item.summary}</p>
        )}

        <div
          className={`mt-auto w-full border-t border-dark-blue/20 pt-3 flex items-center justify-between ${
            compact ? 'pt-2' : 'pt-4'
          }`}>
          <div className={`text-gray-500 ${compact ? 'text-xs' : 'text-xs'}`}>
            {formatDate(item.published_at || item.created_at)}
          </div>

          <Link
            href={`/media/${item.slug}`}
            className={`inline-flex font-medium text-primary hover:text-primary-dark ${
              compact ? 'text-xs' : 'text-xs'
            }`}>
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}

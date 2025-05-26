'use client';

import Link from 'next/link';
import ArticleCard from '../ui/ArticleCard';
import { Media } from '@/lib/types/media_types';
import { usePathname } from 'next/navigation';

interface ArticlePreviewProps {
  articles: Media[];
}

const ArticlesPreview = ({ articles }: ArticlePreviewProps) => {
  const pathname = usePathname();

  // If on the media or admin page, do not render this component
  if (pathname === '/media' || pathname.startsWith('/admin')) return null;

  return (
    <div className="w-full px-8 md:px-32 2xl:px-48 py-8 bg-slate-100 border-b border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">
            {pathname.startsWith('/media') ? 'More Articles' : 'News & Media'}
          </h3>

          <Link
            href="/media"
            className="text-sm text-light-blue hover:underline">
            View all articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((item) => (
            <ArticleCard key={item.id} item={item} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPreview;

import { getMediaNoAuth } from '@/lib/db/media';
import ArticleCard from '@/shared/components/ui/ArticleCard';

export default async function MediaPage() {
  const { data: mediaItems, error } = await getMediaNoAuth();

  return (
    <section className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Blog & News</h1>

        <p className="text-center text-lg text-gray-600">
          Stay updated with the latest news and articles
        </p>
      </div>

      <hr className="my-6 border-dark-blue/20" />

      <h4 className="font-medium mb-4">Latest Articles</h4>

      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Failed to load articles
        </div>
      ) : !mediaItems || mediaItems.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">No articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mediaItems.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

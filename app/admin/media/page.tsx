import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getAllMedia } from '@/lib/db/media';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MediaStatusBadge } from './components/MediaStatusBadge';
import Button from '@/shared/components/ui/Button';
import { PlusIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import MediaContextMenu from '@/shared/components/ui/MediaContextMenu';

export default async function AdminMediaPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];
  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  const { data: mediaItems, error } = await getAllMedia(true);

  return (
    <section className="!pb-48">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Management</h1>
        <Link href="/admin/media/new">
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            <span>Create New Article</span>
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Failed to load media items: {error.message}
        </div>
      ) : mediaItems && mediaItems.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border border-dark-blue/20 font-medium text-dark-blue">
                Title
              </th>
              <th className="p-3 border border-dark-blue/20 font-medium text-dark-blue">
                Last Updated
              </th>
              <th className="p-3 border border-dark-blue/20 font-medium text-dark-blue">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {mediaItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-dark-blue/20 hover:bg-gray-50 group">
                <td className="p-3 border border-dark-blue/20 font-medium">
                  {item.title}
                </td>

                <td className="p-3 border border-dark-blue/20 text-sm text-gray-600">
                  {formatDate(item.updated_at)}
                </td>

                <td className="p-3 border border-dark-blue/20 relative">
                  <div className="flex items-center justify-between">
                    <MediaStatusBadge published={item.published} />
                    <MediaContextMenu
                      itemId={item.id}
                      itemSlug={item.slug}
                      published={item.published}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500 mb-4">No media items found</p>
          <Link href="/admin/media/new">
            <Button>Create your first article</Button>
          </Link>
        </div>
      )}
    </section>
  );
}

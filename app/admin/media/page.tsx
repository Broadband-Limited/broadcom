import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getAllMedia } from '@/lib/db/media';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MediaStatusBadge } from './components/MediaStatusBadge';
import Button from '@/shared/components/ui/Button';
import { PlusIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

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
    <section className="container px-4 py-8 mx-auto">
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Last Updated</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">
                    <MediaStatusBadge published={item.published} />
                  </td>
                  <td className="p-3 border">{formatDate(item.updated_at)}</td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <Link href={`/admin/media/edit/${item.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/media/${item.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

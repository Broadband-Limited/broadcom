import Link from 'next/link';
import {
  Newspaper,
  Briefcase,
  Network,
  FileText,
  Handshake,
  ArrowRight,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { Suspense } from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count?: number;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  href,
  count,
  color,
}) => {
  return (
    <Link
      href={href}
      className={`block p-6 bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}>
      <div
        className={`absolute right-0 top-0 w-32 h-32 ${color} opacity-10 rounded-bl-full transition-all duration-300 group-hover:opacity-20`}></div>
      <div className="flex items-start">
        <div className={`p-3 ${color} rounded-lg text-white mb-4`}>{icon}</div>
        {count !== undefined && (
          <div className="ml-auto text-2xl font-bold text-gray-800 !font-roboto">
            {count}
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="flex items-center text-blue-500 font-medium group-hover:text-blue-700">
        Manage
        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

// Separate component for counts to enable streaming
async function DashboardStats() {
  const [
    divisionsCount,
    servicesCount,
    partnersCount,
    jobsCount,
    applicationsCount,
    mediaCount,
  ] = await Promise.all([
    import('@/lib/db/divisions').then((m) => m.getDivisionsCount()),
    import('@/lib/db/services').then((m) => m.getServicesCount()),
    import('@/lib/db/partners').then((m) => m.getPartnersCount()),
    import('@/lib/db/jobs').then((m) => m.getJobsCount()),
    import('@/lib/db/applications').then((m) => m.getApplicationsCount()),
    import('@/lib/db/media').then((m) => m.getMediaCount()),
  ]);

  const dashboardItems: DashboardCardProps[] = [
    {
      title: 'Divisions',
      description: 'Manage company divisions and their descriptions.',
      icon: <Network className="w-6 h-6" />,
      href: '/admin/divisions',
      count: divisionsCount || 0,
      color: 'bg-amber-600',
    },
    {
      title: 'Services',
      description: 'Manage services across all divisions.',
      icon: <Briefcase className="w-6 h-6" />,
      href: '/admin/services',
      count: servicesCount || 0,
      color: 'bg-blue-600',
    },
    {
      title: 'Partners',
      description: 'Manage business partners and relationships.',
      icon: <Handshake className="w-6 h-6" />,
      href: '/admin/partners',
      count: partnersCount || 0,
      color: 'bg-green-600',
    },
    {
      title: 'Jobs',
      description: 'Manage job postings and career opportunities.',
      icon: <Briefcase className="w-6 h-6" />,
      href: '/admin/jobs',
      count: jobsCount || 0,
      color: 'bg-purple-600',
    },
    {
      title: 'Applications',
      description: 'Review and manage job applications.',
      icon: <FileText className="w-6 h-6" />,
      href: '/admin/applications',
      count: applicationsCount || 0,
      color: 'bg-red-600',
    },
    {
      title: 'Media',
      description: 'Manage news articles and media content.',
      icon: <Newspaper className="w-6 h-6" />,
      href: '/admin/media',
      count: mediaCount || 0,
      color: 'bg-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item, index) => (
        <DashboardCard key={index} {...item} />
      ))}
    </div>
  );
}

// Loading skeleton for dashboard cards
function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="block p-6 bg-white border border-gray-200 shadow-md animate-pulse">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
            <div className="ml-auto w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/auth/login');
  }

  const requiredRoles = ['admin', 'editor'];
  const authorised = await isAuthorised(requiredRoles);

  if (!authorised) {
    redirect('/auth/login');
  }

  return (
    <section className="!pt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your website content and settings from here.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>
    </section>
  );
}

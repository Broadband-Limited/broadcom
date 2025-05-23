import Link from 'next/link';
import {
  Newspaper,
  Briefcase,
  Network,
  Users,
  FileText,
  Handshake,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { isAuthenticated, isAuthorised } from '@/lib/db/auth';
import { getServicesCount } from '@/lib/db/services';
import { getDivisionsCount } from '@/lib/db/divisions';
import { getPartnersCount } from '@/lib/db/partners';
import { getJobsCount } from '@/lib/db/jobs';
import { getApplicationsCount } from '@/lib/db/applications';

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
          <div className="ml-auto text-2xl font-bold text-gray-800">
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
  const [
    divisionsCount,
    servicesCount,
    partnersCount,
    jobsCount,
    applicationsCount,
  ] = await Promise.all([
    getDivisionsCount(),
    getServicesCount(),
    getPartnersCount(),
    getJobsCount(),
    getApplicationsCount(),
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
      description: 'Manage service offerings provided by each division.',
      icon: <Network className="w-6 h-6" />,
      href: '/admin/services',
      count: servicesCount || 0,
      color: 'bg-emerald-600',
    },
    {
      title: 'Partners',
      description: 'Manage partnership information and collaboration details.',
      icon: <Handshake className="w-6 h-6" />,
      href: '/admin/partners',
      count: partnersCount || 0,
      color: 'bg-red-600',
    },
    {
      title: 'Job Listings',
      description: 'Add, edit, and remove job positions available at Broadcom.',
      icon: <Briefcase className="w-6 h-6" />,
      href: '/admin/jobs',
      count: jobsCount || 0,
      color: 'bg-blue-600',
    },
    {
      title: 'Applications',
      description:
        'Review and manage job applications submitted by candidates.',
      icon: <FileText className="w-6 h-6" />,
      href: '/admin/applications',
      count: applicationsCount || 0,
      color: 'bg-green-600',
    },
    {
      title: 'Media',
      description:
        'Manage media content, create new content and edit existing articles.',
      icon: <Newspaper className="w-6 h-6" />,
      href: '/admin/blog',
      count: 12,
      color: 'bg-purple-600',
    },
    {
      title: 'Users',
      description: 'Manage administrator accounts and permissions.',
      icon: <Users className="w-6 h-6" />,
      href: '/admin/users',
      count: 4,
      color: 'bg-indigo-600',
    },
    {
      title: 'Settings',
      description: 'Configure website settings and global preferences.',
      icon: <Settings className="w-6 h-6" />,
      href: '/admin/settings',
      color: 'bg-gray-600',
    },
  ];

  return (
    <section className="">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">
          Manage website content and monitor activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            href={item.href}
            count={item.count}
            color={item.color}
          />
        ))}
      </div>
    </section>
  );
}

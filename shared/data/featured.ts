import {
  Network,
  RadioTower,
  Wrench,
  Cog,
  Server,
  LucideIcon,
  LeafIcon
} from 'lucide-react';

export interface FeaturedService {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const featuredServices: FeaturedService[] = [
  {
    name: 'Project Implementation',
    href: '/division/network-implementation-division',
    icon: RadioTower,
  },
  {
    name: 'Enterprise Network',
    href: '/division/enterprise-division',
    icon: Network,
  },
  {
    name: 'Maintenance and Support',
    href: '/division/managed-services-division',
    icon: Wrench,
  },
  {
    name: 'Network Solutions',
    href: '/division/solutions-division',
    icon: Cog,
  },
  {
    name: 'Network Green Energy Solutions',
    href: '/products/green-energy-solutions',
    icon: LeafIcon,
  },
  {
    name: 'Data Center Solutions',
    href: '/products/enterprise-network-infrastructure',
    icon: Server,
  },
];

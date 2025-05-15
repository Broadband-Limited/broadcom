import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Broadcom | Join Our Team',
  description:
    'Explore career opportunities at Broadcom. Find your next role in technology innovation and make an impact in the tech industry.',
  keywords:
    'Broadcom careers, tech jobs, technology careers, software jobs, hardware engineering, job opportunities',
  openGraph: {
    title: 'Careers at Broadcom | Join Our Team',
    description:
      'Explore exciting career opportunities at Broadcom and join our innovative team.',
    images: ['/images/careers-hero.webp'],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateJobMetadata(
  jobTitle: string,
  jobLocation: string
): Metadata {
  return {
    title: `${jobTitle} - ${jobLocation} | Careers at Broadcom`,
    description: `Apply for the ${jobTitle} position at Broadcom in ${jobLocation}. Join our team and grow your career in technology.`,
    openGraph: {
      title: `${jobTitle} - ${jobLocation} | Careers at Broadcom`,
      description: `Apply for the ${jobTitle} position at Broadcom in ${jobLocation}. Join our team and grow your career.`,
      images: ['/images/careers-hero.webp'],
      type: 'website',
    },
  };
}

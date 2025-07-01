import { getDivisions } from '@/lib/db/divisions';
import { getMediaNoAuth } from '@/lib/db/media';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import ArticlesPreview from './ArticlesPreview';

export default async function Footer() {
  const { data: divisions = [] } = await getDivisions();
  const { data: recentMedia = [] } = await getMediaNoAuth();

  // Get the 3 most recent media items
  const featuredMedia = recentMedia.slice(0, 3);

  const linkGroups = [
    {
      title: 'Corporate',
      links: [
        { title: 'About Us', href: '/about' },
      ],
    },
    {
      title: 'Areas of Expertise',
      links: (divisions ?? []).map((d) => ({
        title: d.name,
        href: `/division/${d.slug}/`,
      })),
    },
    {
      title: 'Support',
      links: [{ title: 'FAQs', href: '/contact' }],
    },
  ];

  const socialAccounts = [
    {
      title: 'Facebook',
      link: 'https://www.facebook.com/broadcom.co.ke',
      icon: Facebook,
    },
    {
      title: 'Twitter / X',
      link: 'https://twitter.com/Broadband_Kenya',
      icon: Twitter,
    },
    {
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/company/broadband-communication-networks-ltd/',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="w-full flex flex-col">
      {/* News and Media Section */}
      {featuredMedia.length > 0 && (
        <ArticlesPreview articles={featuredMedia} />
      )}

      <div className="footer-top w-full px-8 md:px-12 py-12 md:py-24 bg-gray grid grid-cols-1 md:grid-cols-4 gap-6 bg-foreground/90">
        {linkGroups.map((group, index) => (
          <div key={index} className="w-full">
            <h4 className="text-lg !text-background font-semibold mb-4">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {group.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="hover:underline hover:opacity-100 opacity-55 !text-background">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="w-full flex flex-col gap-4 md:gap-2 mt-6 md:m-0">
          <Image
            src="/images/logo.png"
            alt="Broadband Communication Networks Ltd"
            width={200}
            height={200}
            className="object-contain md:ml-auto"
          />
          <p className="md:text-right capitalize !text-xs !text-background opacity-70">
            broadband communication networks
          </p>
          <div className="w-full flex md:justify-end gap-6 md:mt-6">
            {socialAccounts.map((account, index) => (
              <Link
                key={index}
                href={account.link}
                target="_blank"
                className="flex flex-col items-center gap-4 h-fit relative before:absolute before:top-[150%] before:w-[120%] before:h-0.5 before:bg-background before:transition-all before:duration-300 before:ease-in-out before:opacity-0 hover:before:opacity-100">
                <account.icon className="h-5 w-5 stroke-background" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-foreground flex flex-col md:flex-row justify-between px-8 md:px-12 py-6">
        <Link
          href={'/'}
          className="text-center hover:underline !text-background">
          © {new Date().getFullYear()} Broadband Communication Networks Ltd.
        </Link>
      </div>
    </footer>
  );
}

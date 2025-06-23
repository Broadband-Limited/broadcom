'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [divisions, setDivisions] = useState<{ name: string; slug: string }[]>(
    []
  );
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isSolutionsSubmenuOpen, setIsSolutionsSubmenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroObserverRef = useRef<HTMLElement | null>(null);

  // fetch divisions from our API
  useEffect(() => {
    fetch('/api/divisions')
      .then((res) => res.json())
      .then((data) => setDivisions(data || []));
  }, []);

  // Intersection Observer for hero section
  useEffect(() => {
    if (pathname !== '/') {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero is visible if more than 20% is in view
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      {
        threshold: [0, 0.2, 0.5, 1],
        rootMargin: '-0% 0px -0% 0px', // Adjust these values to fine-tune when the transition occurs
      }
    );

    // Find the hero section (first section element on the page)
    const heroElement = document.getElementById('home-hero-section');
    if (heroElement) {
      heroObserverRef.current = heroElement as HTMLElement;
      observer.observe(heroElement);
    }

    return () => {
      if (heroObserverRef.current) {
        observer.unobserve(heroObserverRef.current);
      }
    };
  }, [pathname]);

  const serviceDivisions = divisions.map((d) => ({
    name: d.name,
    href: `/division/${d.slug}/`,
  }));

  const pages = [
    ...(pathname.startsWith('/admin')
      ? [
          { name: 'dashboard', href: '/admin/dashboard' },
          { name: 'divisions & services', href: '/admin/divisions' },
          { name: 'media', href: '/admin/media' },
          { name: 'jobs', href: '/admin/jobs' },
          { name: 'partners', href: '/admin/partners' },
        ]
      : [
          { name: 'home', href: '/' },
          {
            name: 'solutions & services',
            submenu: serviceDivisions,
          },
          { name: 'partners', href: '/partners' },
          { name: 'about us', href: '/about' },
          { name: 'careers', href: '/careers' },
          { name: 'media', href: '/media' },
          { name: 'contact us', href: '/contact' },
        ]),
  ];

  const isSolutionsActive = serviceDivisions.some((subItem) =>
    pathname.includes(subItem.href)
  );

  // Determine if we should show transparent header
  const isTransparent = pathname === '/' && isHeroVisible;

  return (
    <header
      className={cn(
        'w-full shrink-0 sticky z-50 top-0 py-3 px-4 md:px-12 flex items-center justify-between transition-all duration-500 ease-in-out',
        isTransparent ? 'bg-transparent' : 'bg-dark-blue'
      )}>
      <Link href="/" className="logo p-0 !m-0">
        <Image
          src="/images/logo.png"
          alt="Broadband Communication Networks Ltd"
          width={150}
          height={150}
          className="object-contain"
        />
      </Link>

      <nav
        className={cn(
          'absolute top-0 transition-all duration-100 z-10 h-screen w-screen py-6 px-8',
          'lg:static lg:h-fit lg:w-fit lg:p-0 lg:flex-row lg:items-center lg:gap-12 lg:bg-transparent lg:shadow-none',
          'flex flex-col bg-background shadow-2xl',
          menuOpen ? 'left-0' : '-left-full'
        )}>
        <div className="w-full flex items-center justify-between lg:hidden logo mb-8">
          <Image
            src="/images/logo-black.png"
            alt="Broadband Communication Networks Ltd"
            width={150}
            height={150}
            className="object-contain"
          />
          <button className="close-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <X size={24} />
          </button>
        </div>

        {pages.map((page, index) => {
          if (page?.submenu) {
            return (
              <div
                key={index}
                className="relative group w-full lg:w-auto"
                onMouseEnter={() => setIsSolutionsHovered(true)}
                onMouseLeave={() => setIsSolutionsHovered(false)}>
                {/* Desktop Dropdown */}
                <div className="hidden lg:block w-full">
                  <button
                    className={cn(
                      'uppercase lg:text-background lg:!text-sm opacity-80',
                      isSolutionsActive &&
                        'text-light-blue underline underline-offset-4'
                    )}>
                    {page.name}
                  </button>
                  {isSolutionsHovered && (
                    <div className="absolute top-full left-0 shadow-2xl w-[45vw] pt-6">
                      <div
                        className={cn(
                          'pt-2 pb-6',
                          isTransparent
                            ? 'bg-transparent backdrop-blur-2xl border border-background/20 rounded-sm'
                            : 'bg-background',
                          'transition-all duration-150'
                        )}>
                        {page.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2',
                              isTransparent ? 'hover:bg-slate-100/20' : 'hover:bg-slate-100'
                            )}
                            onClick={() => setMenuOpen(false)}>
                            <p
                              className={cn(
                                isTransparent ? '!text-background' : '!text-foreground'
                              )}>
                              {subItem.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Dropdown */}
                <div className="lg:hidden w-full">
                  <button
                    onClick={() =>
                      setIsSolutionsSubmenuOpen(!isSolutionsSubmenuOpen)
                    }
                    className="flex items-center justify-between w-full border-b border-black border-opacity-25 py-4 hover:pl-8 transition-all duration-300">
                    <p
                      className={cn(
                        'capitalize',
                        isSolutionsActive &&
                          'text-light-blue underline underline-offset-4'
                      )}>
                      {page.name}
                    </p>
                    <ChevronRight
                      className={cn(
                        'transition-transform',
                        isSolutionsSubmenuOpen && 'rotate-90'
                      )}
                      size={24}
                    />
                  </button>
                  {isSolutionsSubmenuOpen && (
                    <div className="pl-4">
                      {page.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center justify-between w-full border-b border-black border-opacity-25 py-4 pr-4 hover:pl-8 transition-all duration-300"
                          onClick={() => {
                            setMenuOpen(false);
                            setIsSolutionsSubmenuOpen(false);
                          }}>
                          <p
                            className={cn(
                              'text-base',
                              pathname.includes(subItem.href) &&
                                'text-light-blue underline underline-offset-4'
                            )}>
                            {subItem.name}
                          </p>
                          <ChevronRight size={16} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={index}
              href={page!.href}
              className={cn(
                'flex items-center justify-between w-full py-4 transition-all duration-300',
                'lg:w-fit lg:py-0 lg:border-0',
                'border-b border-black border-opacity-25',
                'hover:pl-8 lg:hover:pl-0'
              )}
              onClick={() => setMenuOpen(false)}>
              <p
                className={cn(
                  'capitalize lg:uppercase lg:!text-background lg:!text-sm',
                  ((page?.href === '/' && pathname === '/') ||
                    (page?.href !== '/' && pathname.includes(page!.href))) &&
                    'underline underline-offset-4'
                )}>
                {page?.name}
              </p>
              <ChevronRight className="lg:hidden" size={24} />
            </Link>
          );
        })}
      </nav>

      <button
        className="menu-button flex lg:hidden !m-0"
        onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={32} className="text-background" />
      </button>
    </header>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';
import { getPartnerImageUrl } from '@/lib/storage';
import { Partner } from '@/lib/types/partner_types';
import Link from 'next/link';

export default function Collaborations() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/partners');
        if (!res.ok) throw new Error(res.statusText);
        const data: Partner[] = await res.json();
        setPartners(data ?? []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  if (loading) return <p className="text-center py-12">Loading partners…</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

  return (
    <section className="py-24 bg-background overflow-hidden">
      <h1 className="w-fit mx-auto mb-12 lines-header">our partners</h1>

      {/* Marquee Container */}
      <div className="w-full relative mb-12 overflow-hidden">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee content */}
        <div className="flex w-max animate-marquee">
          {/* First set of partners */}
          {[...partners, ...partners].map((partner) => (
            <Link
              key={`first-${partner.id}`}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 group transition-transform duration-300 hover:scale-105"
              aria-label={`Visit ${partner.name} website`}>
              <Image
                src={getPartnerImageUrl(partner.image)}
                alt={`${partner.name} logo`}
                width={1000}
                height={1000}
                className="w-32 md:w-48 h-32 md:h-48 object-contain border border-cyan shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:border-light-blue"
              />
            </Link>
          ))}

          {/* Duplicate set for seamless loop */}
          {partners.map((partner) => (
            <a
              key={`second-${partner.id}`}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 group transition-transform duration-300 hover:scale-105"
              aria-label={`Visit ${partner.name} website`}>
              <Image
                src={getPartnerImageUrl(partner.image)}
                alt={`${partner.name} logo`}
                width={1000}
                height={1000}
                className="w-32 md:w-48 h-32 md:h-48 object-contain border border-cyan shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:border-light-blue"
              />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center mb-12">
        Broadband Communication Networks Ltd partners with leading global brands
        such as VIAVI, Calix, and Tektronix to deliver cutting-edge technology
        solutions that ensure the highest quality performance.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <Button
          href={'/contact'}
          variant="outline"
          className={'w-full md:w-fit justify-center'}>
          Become a partner
        </Button>

        <Button href={'/partners'} className={'w-full md:w-fit justify-center'}>
          Learn more
        </Button>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';
import { getPartnerImageUrl } from '@/lib/storage';
import { Partner } from '@/lib/types/partner_types';

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
    <section className="py-24 bg-background">
      <h1 className="w-fit mx-auto mb-12 lines-header">our partners</h1>

      <div className="flex items-center justify-center flex-wrap gap-6 mb-12">
        {partners.slice(0, 3).map((partner) => (
          <div key={partner.id} className="flex flex-col items-center">
            <Image
              src={getPartnerImageUrl(partner.image)}
              alt={`${partner.name} logo`}
              width={1000}
              height={1000}
              className="w-24 md:w-64 shrink-0 aspect-square object-contain border border-cyan shadow-2xl hover:shadow-none transition-all duration-300"
            />
          </div>
        ))}
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

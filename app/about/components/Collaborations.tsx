import Button from '@/shared/components/ui/Button';
import Image from 'next/image';
import React from 'react';

const partners = [
  {
    name: 'VIAVI',
    image: 'viavi',
  },
  {
    name: 'Calix',
    image: 'calix',
  },
  {
    name: 'REMOTEK',
    image: 'remotek',
  },
];

export default function Collaborations() {
  return (
    <section className="!py-24 bg-background">
      <h1 className="w-fit mx-auto mb-12 lines-header">our partners</h1>

      <div className="partners grid grid-cols-3 gap-6 mb-12">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="partner w-full flex flex-col items-center">
            <Image
              src={`/images/partners/${partner.image}.webp`}
              alt={`Broadband Communication Networks Ltd and ${partner.name} partnership`}
              width={250}
              height={250}
              className="w-full aspect-square object-contain border border-cyan shadow-2xl"
            />
          </div>
        ))}
      </div>

      <p className="text-center mb-12">
        Broadband Communication Networks Ltd partners with leading global brands
        such as VIAVI, Calix, and Tektronix to deliver cutting-edge technology
        solutions that ensure the highest quality performance.
      </p>

      <div className="cta-buttons w-full flex flex-col md:flex-row items-center justify-center gap-6">
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

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="!p-0 bg-background aspect-square md:aspect-[3/1] grid grid-cols-1 grid-rows-1">
      <Image
        src={'/images/contact.webp'}
        alt="Broadband Communication Networks Ltd"
        width={1000}
        height={1000}
        className="w-full aspect-square md:aspect-[3/1] col-start-1 row-start-1 z-[2]"
      />

      <div className="w-full h-full col-start-1 row-start-1 z-[3]         bg-gradient-to-t from-[#000000ce] via-[#0000003b] to-[#00000000]"></div>

      <div className="w-full h-full col-start-1 row-start-1 z-[5] flex flex-col justify-end gap-6 mt-auto px-4 md:px-32 py-2 md:py-4">
        <h2 className="!text-background">
          Get in Touch with Us – We’re Here to Help!
        </h2>

        <p className="!text-background opacity-60">
          Whether you have questions, need support, or want to partner with us,
          we&apos;re always available to assist. Choose from the contact methods
          below.
        </p>
      </div>
    </section>
  );
}

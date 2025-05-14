import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="!p-0 bg-background aspect-square md:aspect-[3/1] grid grid-cols-1 grid-rows-1">
      <Image
        src={'/images/kalson.webp'}
        alt="Broadband Communication Networks Ltd"
        width={1000}
        height={1000}
        className="w-full aspect-square md:aspect-[3/1] col-start-1 row-start-1 z-[2]"
      />

      <div className="w-full h-full col-start-1 row-start-1 z-[3]         bg-gradient-to-t from-[#000000ce] via-[#00000094] to-[#00000000]"></div>

      <div className="w-full h-full md:w-2/3 col-start-1 row-start-1 z-[5] flex flex-col justify-between gap-6  !text-background mt-auto px-4 md:px-32 py-2 md:py-4">
        <h1 className="!text-background">Connecting Tomorrow&apos;s Technology, Today</h1>

        <p className="!text-background opacity-60 md:w-2/3">
          At Broadband Communication Networks Ltd, we are dedicated to
          delivering cutting-edge telecommunications and IT solutions that drive
          innovation and connectivity across industries.
        </p>
      </div>
    </section>
  );
};

export default Hero;

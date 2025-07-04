import { Rocket, Binoculars } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

export default function Mission() {
  return (
    <section className="bg-background !py-32 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 lg:aspect-[4/3] flex flex-col gap-4 md:gap-8 lg:justify-evenly">
        <h1 className="w-fit mx-auto mb-6 lines-header">Vision & Mission</h1>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="px-4 aspect-square shrink-0 flex items-center justify-center border-2 border-dark-blue/60 bg-light-blue/20 rounded-full">
              <Binoculars size={24} className="stroke-dark-blue" />
            </div>

            <p className='text-justify'>
              Our <b>vision</b> is to be the model of excellence in delivering
              superior technology solutions and services in Africa.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="px-4 aspect-square shrink-0 flex items-center justify-center border-2 border-dark-blue/60 bg-light-blue/20 rounded-full">
              <Rocket size={24} className="stroke-dark-blue" />
            </div>

            <p className='text-justify'>
              Our <b>mission</b> is to be the preferred provider of innovative
              and superior technology solutions across Africa.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:mt-16 border border-light-blue shadow-2xl z-[2]">
        <Image
          src="/images/mission2.jpg"
          alt="Broadband Communication Networks Ltd"
          width={1000}
          height={1000}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>

      <p className="lg:hidden">
        We aim to enhance connectivity across diverse sectors, ensuring that
        our clients — mobile operators, governments, and businesses — have
        access to the latest technology and tools that enable them to serve
        their customers more effectively.
      </p>
    </section>
  );
}

import { Rocket, Binoculars } from 'lucide-react';
import React from 'react';

export default function Mission() {
  return (
    <section className="bg-background !py-32 flex flex-col gap-8">
      <h1 className="w-fit mx-auto mb-6 lines-header">Vision & Mission</h1>

      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-4">
          <div className="px-4 aspect-square shrink-0 flex items-center justify-center border-2 border-dark-blue/60 bg-light-blue/20 rounded-full">
            <Binoculars size={24} className="stroke-dark-blue" />
          </div>

          <p className='text-justify'>
            Our <b>Vision</b> is to be the model of excellence in delivering
            superior technology solutions and services in Africa.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="px-4 aspect-square shrink-0 flex items-center justify-center border-2 border-dark-blue/60 bg-light-blue/20 rounded-full">
            <Rocket size={24} className="stroke-dark-blue" />
          </div>

          <p className='text-justify'>
            Our <b>Mission</b> is to be the preferred provider of innovative
            and superior technology solutions across East Africa.
          </p>
        </div>
      </div>

      <hr className="lg:hidden opacity-25" />
      
      <p className="lg:hidden text-justify">
        We aim to enhance connectivity across diverse sectors, ensuring that
        our clients — mobile operators, governments, and businesses — have
        access to the latest technology and tools that enable them to serve
        their customers more effectively.
      </p>
    </section>
  );
}

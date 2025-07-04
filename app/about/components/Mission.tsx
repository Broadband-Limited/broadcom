
import {
  Rocket,
  Binoculars,
} from 'lucide-react';
import React from 'react';
import Image from 'next/image'

export default function Mission() {
  return (
    <section className="bg-background !py-32">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 lg:aspect-[4/3] flex flex-col gap-8 lg:justify-evenly">
          <h1 className="w-fit mx-auto mb-6 lines-header">Vision & Mission</h1>
          <p>
             Our <b>vision</b> is to be the model of excellence in delivering superior technology solutions and services in Africa. 
          </p>
          <p>
            Our <b>mission</b> is to be the preferred provider of innovative and superior technology solutions across Africa. 
          </p>
        </div>
        <div className="w-full lg:w-1/2 border border-cyan shadow-2xl z-[2]">
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
      </div>
    </section>
  )
}


import Image from 'next/image'
import React from 'react'

export default function Mission() {
  return (
    <section className="bg-background !py-32">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 md:aspect-[4/3] flex flex-col gap-8 md:justify-evenly">
          <h1 className="w-fit mx-auto mb-6 lines-header">Mission & Vision</h1>
          <p>
            Our mission is to be the preferred provider of innovative and superior technology solutions across Africa. 
          </p>
          <p>
             Our vision is to be the model of excellence in delivering superior technology solutions and services in Africa. 
          </p>
        </div>
        <div className="w-full md:w-1/2 border border-cyan shadow-2xl z-[2]">
          <Image
            src="/images/net.webp"
            alt="Broadband Communication Networks Ltd"
            width={1000}
            height={1000}
            className="w-full aspect-[4/3] object-cover"
          />
        </div>

        <p className="md:hidden">
          We aim to enhance connectivity across diverse sectors, ensuring that
          our clients — mobile operators, governments, and businesses — have
          access to the latest technology and tools that enable them to serve
          their customers more effectively.
        </p>
      </div>
    </section>
  )
}

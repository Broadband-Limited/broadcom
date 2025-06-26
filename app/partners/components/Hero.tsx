import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="w-full !p-0 aspect-square md:aspect-[3/1] bg-background grid grid-cols-1 grid-rows-1">
      <Image
        src="/images/handhsake.webp"
        alt="Broadband Communication Networks Ltd"
        width={1000}
        height={1000}
        className="w-full aspect-square md:aspect-[3/1] col-start-1 row-start-1 z-[2]"
      />

      <div className="w-full aspect-square md:aspect-[3/1] col-start-1 row-start-1 z-[3] bg-gradient-to-t from-[#000000ce] to-[#00000000]"></div>

      <div className="w-full col-start-1 row-start-1 z-[5] flex flex-col gap-6  text-background mt-auto px-4 md:px-32 py-2 md:py-4">
        <h1 className="!text-background">Our Valued, Strategic Partners</h1>

        <p className="!text-background opacity-60">
          Our partners are at the core of delivering exceptional services and
          innovative solutions across various industries.
        </p>
      </div>
    </section>
  )
}

export default Hero
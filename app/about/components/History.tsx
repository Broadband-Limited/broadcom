import Image from 'next/image'
import React from 'react'

export default function History() {
  return (
    <section className="!py-12">
      <h1 className="w-fit mx-auto mb-12 lines-header">our history</h1>

      <div className="w-full flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <Image
          src={'/images/news.webp'}
          alt="Broadband Communication Networks Ltd"
          width={500}
          height={500}
          className="w-full md:w-1/2 aspect-[4/3] border border-cyan shadow-2xl"
        />

        <p className="w-full md:w-1/2 !text-sm md:!text-base">
          Founded in 2001, Broadband Communication Networks Ltd began as a small
          telecommunications provider. Over the years, we’ve grown into a leader
          in the IT and telecommunications sector, partnering with industry
          leaders and expanding our service offerings across Africa.
        </p>
      </div>
    </section>
  )
}
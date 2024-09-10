'use client'
import { AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const Landing = () => {
  return (
    <section className="flex flex-col items-center gap-8 md:px-64 mb-16">
      <div className="w-full">
        <h2 className="text-4xl font-bold">Leading the Future of Network <br className='hidden md:block' />& Infrastructure Solutions</h2>

        <p className='text-gray-600 mt-8'>Broadband Communication Networks Limited is a leading African telecommunications provider specializing in network solutions for various sectors. We offer comprehensive services from network installations to managed solutions and cater to end-to-end telecommunications needs.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="flex-shrink-0 w-screen h-auto md:aspect-[21/5] overflow-hidden relative">
          <p className="absolute left-4 tracking-tight md:left-32 w-1/4 md:w-1/3 top-1/2 -translate-y-1/2 text-xs md:text-3xl uppercase text-gray-700 md:leading-10 font-semibold gelasio"><span className='hidden md:block gelasio'>Your Partner in Telecommunication Excellence <br /> </span>Empowering Connectivity across Africa.</p>
          <Image
            alt="Broadcom Services"
            src={'/images/services.webp'}
            width={1000}
            height={400}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default Landing

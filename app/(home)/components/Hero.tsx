'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section
      id="home-hero-section"
      className="grid w-full aspect-auto h-screen overflow-hidden !p-0 -mt-16">
      <Image
        src="/images/hero-telecom-towers.webp"
        alt="Broadband Communication Network"
        width={1000}
        height={1000}
        className="col-start-1 row-start-1 w-full aspect-auto h-screen"
        priority
      />
      <div className="col-start-1 row-start-1 z-[3] w-full h-full bg-black/50" />{' '}
      {/* Content */}
      <motion.div
        className="col-start-1 row-start-1 z-[4] flex flex-col items-center justify-center gap-8 md:gap-16 h-full text-center px-6 md:px-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}>
        <motion.h1
          className="!text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}>
          Pioneering Telecom Solutions Across East Africa
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto !text-white !opacity-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}>
          Over 24 years of delivering innovative telecom solutions. Trusted by
          Mobile Network Operators, ISPs, and Large Enterprises.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}>
          <Button
            href="/about"
            variant="primary"
            size="lg"
            className="bg-dark-blue hover:bg-dark-blue/90">
            Learn More About Us
          </Button>{' '}
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white/20">
            Get In Touch
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

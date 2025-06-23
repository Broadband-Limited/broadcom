'use client';

import Button from '@/shared/components/ui/Button';
import React from 'react';
import { motion } from 'framer-motion';

export default function ReachOut() {
  return (
    <section className="grid w-full aspect-[16/9] md:aspect-[3/1] !p-0">
      <video
        muted
        autoPlay
        playsInline
        loop
        className="col-start-1 row-start-1 w-full h-full aspect-[16/9] md:aspect-[3/1] object-cover">
        <source src="/videos/tower.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="col-start-1 row-start-1 z-[3] w-full h-full bg-black/50"></div>{' '}
      <motion.div
        className="col-start-1 row-start-1 z-[4] flex flex-col items-center justify-center gap-8 p-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}>
        <motion.h1
          className="!text-background text-4xl font-bold hidden md:flex"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
          Reach out to us
        </motion.h1>

        <motion.p
          className="!text-background text-center opacity-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}>
          Get in touch with us to learn more about how we can transform your
          network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}>
          <Button
            href={'/contact'}
            variant="outline"
            className={'bg-transparent !text-background !border-background'}>
            Contact us
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

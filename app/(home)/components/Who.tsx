'use client';

import React from 'react';
import Button from '@/shared/components/ui/Button';
import { motion } from 'framer-motion';

const Who = () => {
  return (
    <motion.section
      className="bg-background !py-12 md:!py-24 flex flex-col gap-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <motion.h1
        className="md:text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
        Leading the Way in Communication Technologies
      </motion.h1>
      <motion.p
        className="md:text-center md:mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}>
        For over two decades, Broadband Communication Network has been at the
        forefront developing the African telecommunications industry, with
        innovative solutions for Mobile Network Operators, ISPs, and Large
        Enterprises. Our commitment to excellence, sustainability, and
        cutting-edge technology ensures that we deliver reliable, scalable, and
        cost-effective Solutions and Services to our clients meeting the dynamic
        ICT requirements.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}>
        <Button
          href="/about"
          variant="primary"
          size="lg"
          className="md:mx-auto">
          Discover Our Story
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default Who;

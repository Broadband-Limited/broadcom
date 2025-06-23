'use client';

import React from 'react';
import { motion } from 'framer-motion';

const points = [
  {
    title: '24+ years',
    description:
      'With over 24 years in the telecom industry, we have built a reputation for delivering high-quality solutions across Africa.',
  },
  {
    title: 'Trusted Partnerships',
    description:
      'Our partnerships with technology global leaders like Nokia, Ericcson, Vertiv, Rohde & Schwarz allows us to provide top-tier Products & Services with cutting-edge technology.',
  },
  {
    title: 'Sustainable Solutions',
    description:
      'We are dedicated to reducing environmental impact by offering green energy solutions tailored to modern telecom needs.',
  },
];

interface PointProps {
  title: string;
  description: string;
}

const Point: React.FC<PointProps> = ({ title, description }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}>
      <motion.h2
        className="!text-foreground !font-black text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}>
        {title}
      </motion.h2>
      <motion.p
        className="text-center opacity-75"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.75, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}>
        {description}
      </motion.p>
    </motion.div>
  );
};

const WhyUs = () => {
  return (
    <motion.section
      className="bg-background !py-24 flex flex-col gap-8 md:gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <motion.h1
        className="w-fit mx-auto mb-6 lines-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
        why choose us
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {points.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.2,
              ease: 'easeOut',
            }}>
            <Point {...point} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyUs;

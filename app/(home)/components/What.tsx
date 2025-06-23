'use client';

import { FeaturedService, featuredServices } from '@/shared/data/featured';
import Link from 'next/link';
import React, { FC } from 'react';
import { motion } from 'framer-motion';

const ServiceLink: FC<FeaturedService> = ({ name, href, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}>
      <Link
        href={href}
        className="animated-link-wrapper flex items-center gap-6">
        <div className="icon animated-link flex items-center justify-center">
          {React.createElement(icon, {
            size: 32,
            className: 'stroke-dark-blue',
          })}
        </div>
        <p>{name}</p>
      </Link>
    </motion.div>
  );
};

const What = () => {
  return (
    <motion.section
      className="overflow-x-hidden bg-background flex flex-col gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <motion.h1
        className="w-fit mx-auto lines-header text-nowrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
        Core Solutions & Services
      </motion.h1>
      <motion.p
        className="text-justify max-w-2xl md:mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}>
        We specialize in providing comprehensive quality Telecommunication and
        IT Solutions and Services that drive connectivity geared towards
        improving Quality of Service, enhancing network performance and driving
        telecom and enterprise operations efficiency. Our solutions cover the
        following thematic areas:
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-6 lg:!px-24">
        {featuredServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.6 + index * 0.1,
              ease: 'easeOut',
            }}>
            <ServiceLink {...service} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default What;

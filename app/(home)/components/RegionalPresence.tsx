'use client';

import React from 'react';
import Button from '@/shared/components/ui/Button';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const countries = ['Kenya', 'Tanzania', 'Ethiopia'];

const RegionalPresence = () => {
  return (
    <motion.section
      className="bg-gradient-to-b from-dark-blue/10 to-background !py-16 md:!py-24 flex flex-col items-center gap-12 md:gap-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <motion.h1
        className="w-fit mx-auto lines-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}>
        Our Regional Presence
      </motion.h1>

      <motion.p
        className="text-justify max-w-2xl md:mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}>
        With a strong footprint across East Africa, we have successfully
        delivered cutting-edge telecommunications and ICT solutions to multiple
        countries, establishing ourselves as a trusted partner for network
        operators and enterprises seeking reliable connectivity solutions.
      </motion.p>

      {/* Countries List */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}>
        <h3 className="w-fit">Countries We Serve</h3>{' '}
        <div className="flex items-center flex-col md:flex-row">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.8 + index * 0.1,
                ease: 'easeOut',
              }}>
              <div className="flex items-center justify-center gap-2 p-3 w-32 md:w-fit bg-dark-blue/10 rounded-xs hover:bg-dark-blue/10 transition-colors">
                <MapPin size={16} className="stroke-dark-blue" />
                <span className="text-sm font-medium text-foreground text-center">
                  {country}
                </span>
              </div>

              {index < countries.length - 1 && (
                <div className="h-10 w-[1px] md:h-[1px] md:w-24 bg-dark-blue/20" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}>
        <Button href="/success-stories" variant="primary" size="lg">
          View Our Success Stories
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default RegionalPresence;

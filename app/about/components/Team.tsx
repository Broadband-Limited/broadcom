'use client';

import { members } from '@/shared/data/team';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDE_INTERVAL =
  typeof window !== 'undefined' && window.innerWidth <= 768 ? 3000 : 6000;
const SLIDE_TRANSITION = 0.5;

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % members.length);
      }, SLIDE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="w-full !p-0 !pb-16 flex flex-col gap-12">
      <div className="bg-background/90 py-12 md:py-24">
        <h1 className="w-fit mx-auto mb-12 lines-header">Leadership Team</h1>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-4 gap-8 mb-12">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative cursor-pointer"
                animate={{
                  opacity: index === currentIndex ? 1 : 0.7,
                  scale: index === currentIndex ? 1 : 0.9,
                }}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                transition={{ duration: SLIDE_TRANSITION }}>
                <div className="aspect-[3/4] relative overflow-hidden shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/0 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                    <h3 className="!text-background !text-xl mb-2">
                      {member.name}
                    </h3>
                    <p className="!text-background/90 !text-sm font-light">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `${-100 * currentIndex}%` }}
                transition={{ duration: SLIDE_TRANSITION }}>
                {members.map((member) => (
                  <div key={member.name} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col">
                      <div className="aspect-[3/4] relative overflow-hidden shadow-xl mb-6">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/95 via-dark-blue/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="!text-background !text-xl mb-2">
                            {member.name}
                          </h3>
                          <p className="!text-background/90 !text-sm font-light">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground/80 !text-sm leading-relaxed px-2">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-dark-blue/80 hover:bg-dark-blue p-3 rounded-full text-background transition-colors duration-300"
              aria-label="Previous member">
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-dark-blue/80 hover:bg-dark-blue p-3 rounded-full text-background transition-colors duration-300"
              aria-label="Next member">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Desktop Description */}
          <div className="hidden md:block max-w-3xl mx-auto mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: SLIDE_TRANSITION }}
                className="text-center px-4">
                <p className="text-foreground/80 leading-relaxed">
                  {members[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {members.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-dark-blue scale-125'
                    : 'bg-dark-blue/30 hover:bg-dark-blue/50'
                }`}
                aria-label={`View ${members[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

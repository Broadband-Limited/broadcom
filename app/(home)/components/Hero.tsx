'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselHighlights } from '@/shared/data/highlights';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CarouselHighlights.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? CarouselHighlights.length - 1 : prev - 1
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 4500);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="flex flex-col items-center landing !p-0 md:justify-center">
      <div
        className="relative w-full aspect-[3/4] md:aspect-[2.5/1]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full h-full grid grid-cols-1">
            <Image
              src={`/images/${CarouselHighlights[currentSlide].image}.webp`}
              alt="broadcom"
              width={1000}
              height={1000}
              className="w-full aspect-[3/4] md:aspect-[2.5/1] col-start-1 row-start-1"
            />

            <div className="col-start-1 row-start-1 flex flex-col items-center md:items-start justify-end gap-12 md:gap-12 p-6 md:p-32 bg-gradient-to-b from-transparent via-black/50 to-black/75 md:to-black/50">
              <h1 className="!text-background">
                {CarouselHighlights[currentSlide].title}
              </h1>
              <p className="text-justify text-sm md:text-base !text-background">
                {CarouselHighlights[currentSlide].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {CarouselHighlights.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-2 rounded-full overflow-hidden bg-background/50 transition-all duration-300 ${
                index === currentSlide
                  ? 'scale-110'
                  : 'hover:bg-background/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`rounded-full ${index === currentSlide ? 'opacity-100 progress-bar-5' : 'opacity-0'}`}></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

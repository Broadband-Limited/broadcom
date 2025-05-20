'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarouselHighlights } from '@/shared/data/highlights';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';

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

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
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
    enter: { opacity: 0, x: 1000 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -1000 },
  };

  return (
    <section className="flex flex-col items-center landing gap-0 !p-6 md:!p-16 md:justify-center">
      <div
        className="relative w-full min-h-161 md:min-h-100 md:h-100 p-0 bg-background shadow-2xl overflow-hidden"
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
            className="w-full h-full">
            <div className="w-full h-full flex flex-col md:flex-row items-center gap-6">
              <div className="w-full aspect-[4/3] md:w-1/2 md:h-full md:aspect-auto">
                <Image
                  src={`/images/${CarouselHighlights[currentSlide].image}.webp`}
                  alt="broadcom"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
              </div>

              <div className="w-full md:w-1/2 p-4 flex flex-col items-center md:items-start gap-6 md:gap-12">
                <h2 className="text-center md:text-left">
                  {CarouselHighlights[currentSlide].title}
                </h2>
                <p className="text-center md:text-left text-sm md:text-base">
                  {CarouselHighlights[currentSlide].desc}
                </p>
                <Button href={CarouselHighlights[currentSlide].href}>
                  <span>Learn More</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors shadow-lg"
          aria-label="Previous slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-dark-blue">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 hover:bg-background transition-colors shadow-lg"
          aria-label="Next slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-dark-blue">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;

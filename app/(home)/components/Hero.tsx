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

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
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
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="flex flex-col items-center landing gap-0 !p-6 md:!p-16 md:justify-center">
      <div
        className="relative w-full min-h-[80vh] md:min-h-[65vh] p-6 pb-12 bg-background shadow-2xl overflow-hidden"
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
              <div className="w-full aspect-[4/3] md:w-1/2">
                <Image
                  src={`/images/${CarouselHighlights[currentSlide].image}.webp`}
                  alt="broadcom"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-12 md:gap-12">
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

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {CarouselHighlights.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-dark-blue scale-110'
                  : 'bg-dark-blue/50 hover:bg-dark-blue/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

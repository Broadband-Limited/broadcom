'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  imageDimensions?: string;
}

export default function ImageCarousel({
  images,
  alt,
  className = '',
  autoPlay = true,
  interval = 5000,
  imageDimensions = '',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPaused && images.length > 1) {
      const timer = setInterval(goToNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, isPaused, interval, goToNext, images.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!images?.length) return null;

  if (images.length === 1) {
    return (
      <div className={cn('relative overflow-hidden w-full h-full', className)}>
        <Image
          src={images[0]}
          alt={alt}
          width={1000}
          height={1000}
          className={cn('object-cover w-full h-full', imageDimensions)}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={cn('relative w-full h-full', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="relative overflow-hidden w-full h-full group">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          width={1000}
          height={1000}
          className={cn(
            'object-cover transition-all duration-500 w-full h-full',
            imageDimensions
          )}
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows - Hidden on mobile */}
        <div className="hidden md:flex">
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-background/40 hover:bg-background/70 backdrop-blur-3xl p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous image">
            <ChevronLeft size={24} className="" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-background/40 hover:bg-background/70 backdrop-blur-3xl p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next image">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300 hover:scale-125',
                currentIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

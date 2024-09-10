'use client'
import { useState, useEffect } from 'react';
import { Carousel } from 'flowbite-react';

const useResponsiveComponent = () => {
  const [Component, setComponent] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 'div' : Carousel;
    }
    return 'div';
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setComponent('div');
      } else {
        setComponent(Carousel);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return Component;
};

export default useResponsiveComponent;
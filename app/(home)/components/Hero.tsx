'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

import { CarouselHighlights } from '@/shared/data/highlights';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  return (
    <section
      className={`flex flex-col items-center landing gap-0 !p-6 md:!p-16 h-fit md:justify-center`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 pb-12 md:py-8 md:px-12 md:pb-12 bg-background shadow-2xl">
        <Slider {...settings}>
          {CarouselHighlights.map((highlight, index) => (
            <div key={index}>
              <div className="w-full flex-shrink-0 flex flex-col md:flex-row items-center gap-6 md:pb-12">
                <motion.div {...fadeInUp} className="w-full md:w-1/2">
                  <Image
                    src={`/images/${highlight.image}.webp`}
                    alt="broadcom"
                    width={1000}
                    height={1000}
                    className="w-full aspect-[4/3]"
                  />
                </motion.div>

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 md:gap-12 md:px-8">
                  <motion.h2 {...fadeInUp} className="text-center md:text-left">
                    {highlight.title}
                  </motion.h2>
                  <motion.p
                    {...fadeInUp}
                    className="text-center md:text-left text-sm md:text-base">
                    {highlight.desc}
                  </motion.p>
                  <motion.div {...fadeInUp}>
                    <Button href={highlight.href}>
                      <span>Learn More</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default Hero;

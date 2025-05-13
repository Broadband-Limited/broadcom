"use client"

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  return (
    <section className={`flex flex-col items-center landing gap-0 !p-6 md:!p-16 h-fit md:justify-center`}>
      <div className="w-full p-4 pb-12 md:py-8 md:px-12 md:pb-12 bg-background shadow-2xl">
        <Slider {...settings}>
          {CarouselHighlights.map((highlight, index) => (
            <div key={index} className="">
              <div className="w-full flex-shrink-0 flex flex-col md:flex-row items-center gap-6 md:pb-12">
                <Image
                  src={`/images/${highlight.image}.webp`}
                  alt="broadcom"
                  width={1000}
                  height={1000}
                  className="w-full md:w-1/2 aspect-[4/3]"
                />

                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 md:gap-12 md:px-8">
                  <h2 className="text-center md:text-left">{highlight.title}</h2>
                  <p className="text-center md:text-left text-sm md:text-base">
                    {highlight.desc}
                  </p>
                  <Button href={highlight.href}>
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;

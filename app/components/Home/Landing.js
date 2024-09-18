'use client'
import { AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from 'next/image'

const container = {
  hidden: { opacity: 0, y: '5vh' },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-1vh' },
}

const images = [
  "award.webp",
  "award2.webp",
  "broadcom.webp",
  "mission.webp",
  "net.webp",
  "news.webp",
  "product.webp",
  "society.webp",
  "solution.webp",
  "vision.webp"
]

const Landing = () => {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [-600, 7000])

  const [textNo, setTextNo] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      setTextNo((prev) => (prev > 2 ? 1 : prev + 1))
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4500,
  };

  return (
    <section className="flex flex-col items-center gap-8 md:px-64">

      <div className="w-full h-48 md:h-auto md:mb-16 appear">
        <h2 className="text-4xl font-bold">
          <span className="whitespace-nowrap">We deliver</span>
          <div className="auto-scroll">
            {textNo === 1 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={1}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-500"
                >
                  Air Traffic Control
                </motion.div>
              </AnimatePresence>
            ) : textNo === 2 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={2}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-500"
                >
                  Info/Data Management.
                </motion.div>
              </AnimatePresence>
            ) : textNo === 3 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={3}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-500"
                >
                  Public Safety,
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={1}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-gray-500"
                >
                  Information/Data Management.
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </h2>
      </div>

      <div
        className="flex-shrink-0 w-full shadow-2xl appear"
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="image w-full aspect-[21/9]">
              <Image
                src={`/images/${image}`}
                alt=""
                width={1000}
                height={1000}
                className="object-cover w-full"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Landing

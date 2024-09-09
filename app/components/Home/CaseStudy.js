'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

const works = [
  {
    title: 'Telecom Network in Kenya',
    short: 'Wireless projects in Kenya.',
    description:
      'Design, implementation, and commissioning of wireless and wire-line telecommunication products, with expertise in mobile networks, fiber optics, and Radio Access Network.',
    bgColor: '#07a077',
    color: '254 255 221',
    img: '/images/1.png',
  },
  {
    title: 'Network Solutions in Africa',
    short: 'Deployment across Africa.',
    description:
      'Provided telecom network solutions, implementing dominant GSM, UMTS, and CDMA products.',
    bgColor: '#0048cc',
    color: '255 255 255',
    img: '/images/2.png',
  },
  {
    title: 'Maintenance for Mobile Industry',
    short: 'Comprehensive maintenance solutions.',
    description:
      'Managed services division covers maintenance for both active and passive telecommunication networks, ensuring optimal performance.',
    bgColor: '#5f69f7',
    gradient: 'linear-gradient(81.97deg,#2d4ebd 6.68%,#656cff 96.4%)',
    color: '255 255 255',
    img: '/images/3.png',
  },
]

const CaseStudy = () => {
  const [slideNo, setSlideNo] = useState(1)
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center text-[#feffdd] pb-36 md:pb-0"
      style={{
        background: works[slideNo - 1].gradient
          ? works[slideNo - 1].gradient
          : works[slideNo - 1].bgColor || '#07a077',
      }}
    >
      <AnimatePresence mode="wait">
        {slideNo === 1 ? (
          <Slide key={1} {...works[0]} />
        ) : slideNo === 2 ? (
          <Slide key={2} {...works[1]} />
        ) : slideNo === 3 ? (
          <Slide key={3} {...works[2]} />
        ) : (
          <Slide key={1} {...works[0]} />
        )}
      </AnimatePresence>

      <div className="sliders absolute top-[95%] md:top-1/2 md:right-12 flex md:flex-col gap-6 cursor-pointer">
        <div
          className={`relative w-2 h-2 rounded-full ${
            slideNo === 1
              ? 'border-spaced opacity-100'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={{
            backgroundColor: `rgb(${works[slideNo - 1].color})`,
            border: `1px solid rgb(${works[slideNo - 1].color})`,
          }}
          onClick={() => {
            setSlideNo(1)
          }}
        />
        <div
          className={`relative w-2 h-2 rounded-full ${
            slideNo === 2
              ? 'border-spaced opacity-100'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={{
            backgroundColor: `rgb(${works[slideNo - 1].color})`,
          }}
          onClick={() => {
            setSlideNo(2)
          }}
        />
        <div
          className={`relative w-2 h-2 rounded-full ${
            slideNo === 3
              ? 'border-spaced opacity-100'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={{
            backgroundColor: `rgb(${works[slideNo - 1].color})`,
          }}
          onClick={() => {
            setSlideNo(3)
          }}
        />
      </div>
    </motion.section>
  )
}

const container = {
  hidden: { opacity: 0, y: '10vh' },
  show: { opacity: 1, y: 0 },
}

const Slide = ({ title, short, description, color, img }) => {
  return (
    <motion.div
      className="slide container-custom-md"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-28">
        <div className="img-box flex-1">
          <Image
            className="w-full aspect-auto"
            src={img}
            alt={title} // Added alt attribute
            width={500} // Adjust dimensions as needed
            height={500}
          />
        </div>
        <div className="content flex-1 flex flex-col items-center md:items-start gap-6">

          <p className="tracking-widest text-white opacity-90 text-center md:text-left">{title}</p>
          <h4 className="text-3xl tracking-tight font-medium text-balance text-white text-center md:text-left">
            {short}
          </h4>
          <p className="opacity-70 leading-relaxed text-balance text-gray-300 text-center md:text-left">
            {description}
          </p>
          <button
            className="md:mr-auto border-b-[3px] text-white"
            style={{
              borderColor: `rgb(${color} / 0.5)`,
            }}
          >
            View Case Study
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CaseStudy

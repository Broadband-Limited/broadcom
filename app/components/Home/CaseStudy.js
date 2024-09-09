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
    img: '/images/net.webp',
  },
  {
    title: 'Network Solutions in Africa',
    short: 'Deployment across Africa.',
    description:
      'Provided telecom network solutions, implementing dominant GSM, UMTS, and CDMA products.',
    bgColor: '#0048cc',
    color: '255 255 255',
    img: '/images/telecom.webp',
  },
  {
    title: 'Maintenance for Mobile Industry',
    short: 'Comprehensive maintenance solutions.',
    description:
      'Managed services division covers maintenance for both active and passive telecommunication networks, ensuring optimal performance.',
    bgColor: '#5f69f7',
    gradient: 'linear-gradient(81.97deg,#2d4ebd 6.68%,#656cff 96.4%)',
    color: '255 255 255',
    img: '/images/maintenance.webp',
  },
]

const container = {
  hidden: { opacity: 0, y: '10vh' },
  show: { opacity: 1, y: 0 },
}

const Slide = ({ title, short, description, color, img }) => {
  return (
    <motion.div
      className="slide w-full h-screen md:h-[80vh] flex flex-col md:flex-row items-center gap-2 md:gap-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="img-box w-full h-1/2 md:w-1/2 md:h-full flex-shrink-0 overflow-hidden">
        <Image
          className="w-full h-full aspect-auto"
          src={img}
          alt={title} // Added alt attribute
          width={1000} // Adjust dimensions as needed
          height={1000}
        />
      </div>

      <div className="content w-full h-1/2 md:w-1/2 md:h-full flex-shrink-0 p-6 pb-16 md:pb-0 md:p-0 md:pr-16 flex flex-col items-center justify-center md:items-start gap-3 md:gap-6">
        <p className="tracking-widest text-white opacity-90 text-center md:text-left">
          {title}
        </p>
        <h4 className="text-3xl tracking-tight font-medium text-balance text-white text-center md:text-left">
          {short}
        </h4>
        <p className="opacity-70 leading-relaxed text-balance text-gray-200 text-center md:text-left">
          {description}
        </p>
      </div>

    </motion.div>
  )
}

const SliderDot = ({ isActive, onClick, color }) => {
  return (
    <div
      className={`relative w-3 h-3 rounded-full flex items-center justify-center bg-white before:absolute before:w-[170%] before:h-[170%] before:rounded-full before:border-2  ${
        isActive ? 'opacity-100 before:block' : 'before:hidden opacity-50 hover:opacity-100'
      }`}
      onClick={onClick}
    />
  )
}

const CaseStudy = () => {
  const [slideNo, setSlideNo] = useState(1)
  return (
    <motion.section
      className="relative h-screen md:h-[80vh] flex items-center justify-center text-[#feffdd] p-0"
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
        {works.map((work, index) => (
          <SliderDot
            key={index}
            isActive={slideNo === index + 1}
            color={work.color}
            onClick={() => setSlideNo(index + 1)}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default CaseStudy

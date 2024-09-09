'use client'
import { AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const container = {
  hidden: { opacity: 0, y: '5vh' },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-1vh' },
}

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

  return (
    <section className="flex flex-col items-center gap-8 md:px-64">

      <div className="w-full">
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

      <motion.div
        // style={{ x }}
        className="flex-shrink-0 w-screen hidden"
      >
        <video
          className="w-full h-full"
          autoPlay
          loop
          muted
          preload="auto"
          poster=""
        >
          <source
            src=""
            type="video/mp4"
          />
        </video>
      </motion.div>
    </section>
  )
}

export default Landing

"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const Growing = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-6000, 500]);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden isolate text-white"
    >
      <div className="wrapper container-custom-xs">
        <h2 className="text-4xl font-serif mb-20">
          15 years and still growing strong
        </h2>
        <div className="flex gap-8">
          <div className="">
            <Image
              width={50}
              height={50}
              className="mb-4"
              src=""
              alt=""
            />
            <p>
              Fastest growing company in the USA for years 2021, 2020 and 2019
            </p>
          </div>
          <div className="">
            <Image
              width={50}
              height={50}
              className="mb-4"
              src=""
              alt=""
            />
            <p>
              Fastest growing company in the USA for years 2021, 2020 and 2019
            </p>
          </div>
          <div className="">
            <Image
              width={50}
              height={50}
              className="mb-4"
              src=""
              alt=""
            />
            <p>
              Fastest growing company in the USA for years 2021, 2020 and 2019
            </p>
          </div>
          <div className="">
            <Image
              width={50}
              height={50}
              className="mb-4"
              src=""
              alt=""
            />
            <p>
              Fastest growing company in the USA for years 2021, 2020 and 2019
            </p>
          </div>
        </div>
      </div>
      <motion.div
        style={{
          x,
        }}
        className="absolute top-0 bottom-0 -left-1/4 -right-1/4 bg-black -z-10"
      ></motion.div>
    </section>
  );
};

export default Growing;
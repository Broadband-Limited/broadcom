import Image from 'next/image';
import React from 'react';

export default function QualityPolicy() {
  return (
    <section className="!py-12">
      <h1 className="w-fit mx-auto mb-12 lines-header">
        quality policy statement
      </h1>

      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
        <div className="w-full lg:w-1/2 space-y-4">
          <p>
            At Broadband Communication Networks Ltd, we are committed to
            delivering excellence in all our telecommunications and IT
            solutions. Our quality policy is founded on continuous improvement,
            customer satisfaction, and adherence to international standards.
          </p>

          <p>
            We ensure that every product and service meets or exceeds industry
            benchmarks through rigorous testing, skilled expertise, and ongoing
            investment in cutting-edge technology. Our quality management system
            is designed to consistently deliver reliable, innovative solutions
            that drive our clients&apos; success.
          </p>

          <p>
            We are dedicated to fostering a culture of quality awareness
            throughout our organization, empowering our team to take ownership
            of excellence in every aspect of our operations.
          </p>
        </div>

        <Image
          src={'/images/quality.jpeg'}
          alt="Quality Assurance - Protocol Analyzer"
          width={500}
          height={500}
          className="w-full lg:w-1/2 aspect-[4/3] border border-cyan shadow-2xl"
        />
      </div>
    </section>
  );
}

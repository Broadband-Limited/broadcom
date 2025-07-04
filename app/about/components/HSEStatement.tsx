import Image from 'next/image';
import React from 'react';

export default function HSEStatement() {
  return (
    <section className="bg-background !py-12">
      <h1 className="w-fit mx-auto mb-12 lines-header">
        health, safety & environment statement
      </h1>

      <div className="w-full flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
        <Image
          src={'/images/green_energy.webp'}
          alt="Green Energy and Environmental Sustainability"
          width={1000}
          height={1000}
          className="w-full lg:w-1/2 aspect-[3/4] border border-cyan shadow-2xl"
        />

        <div className="w-full lg:w-1/2 space-y-4 *:text-justify">
          <p>
            At Broadband Communication Networks Ltd, the health and safety of
            our employees, partners, and communities is our highest priority. We
            are committed to maintaining a zero-harm workplace and protecting
            the environment for future generations.
          </p>

          <p>
            Our comprehensive HSE management system ensures compliance with all
            applicable regulations and international standards. We continuously
            assess and mitigate risks, implement preventive measures, and
            promote sustainable practices across all our operations.
          </p>

          <p>
            We believe that environmental stewardship and safety excellence are
            fundamental to our business success. Every team member is empowered
            and accountable for maintaining the highest HSE standards in their
            daily activities.
          </p>

          <p>
            Our commitment extends to responsible resource management, waste
            reduction, and the promotion of green technologies that contribute
            to a sustainable future for Africa and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}

import { FeaturedService, featuredServices } from '@/shared/data/featured';
import Link from 'next/link';
import React, { FC } from 'react';

const ServiceLink: FC<FeaturedService> = ({ name, href, icon }) => {
  return (
    <Link href={href} className="animated-link-wrapper flex items-center gap-6">
      <div className="icon animated-link flex items-center justify-center">
        {React.createElement(icon, { size: 32, className: 'stroke-dark-blue' })}
      </div>
      <p>{name}</p>
    </Link>
  );
};

const CoreSolutions = () => {
  return (
    <section className="overflow-x-hidden bg-background flex flex-col gap-6">
      <h1 className="w-fit mx-auto lines-header">Core Solutions & Services</h1>
      <p className="w-full text-left">
        We deliver end-to-end ICT solutions and services that support network
        operators and enterprises across Africa. Our expertise covers every
        layer of telecom and IT infrastructure, from mobile broadband and
        transmission networks to data centers, power systems, and quality of
        service optimization. Designed to enhance performance, reliability, and
        operational efficiency, our solutions are tailored to meet the evolving
        needs of Africa&apos;s digital landscape. Our key solution & services include:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-6">
        {featuredServices.map((service, index) => (
          <ServiceLink key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default CoreSolutions;

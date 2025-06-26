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

const Services = () => {
  return (
    <section className="overflow-x-hidden !py-12 bg-background flex flex-col gap-6">
      <h1 className="w-fit mx-auto lines-header">what we do</h1>
      <p className="w-full text-left">
        We specialize in providing comprehensive quality Telecommunication and
        IT Solutions and Services that drive connectivity, enhance network
        performance and drive enterprise operations efficiency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-6">
        {featuredServices.map((service, index) => (
          <ServiceLink key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;

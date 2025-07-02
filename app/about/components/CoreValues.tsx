import { cn } from '@/lib/utils';
import {
  CircleCheckBig,
  Headset,
  Lightbulb,
  Users,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import React from 'react';

const values = [
  {
    title: 'Innovation',
    description:
      'We are constantly looking for new ways to improve our products and services.',
    icon: Lightbulb,
  },
  {
    title: 'Integrity',
    description:
      'We uphold strong moral and ethical principles, ensuring honesty, transparency, and trust in every aspect of our business and partnerships',
    icon: ShieldCheck,
  },
  {
    title: 'Superior Quality',
    description:
      'We strive to deliver the highest quality products and services.',
    icon: CircleCheckBig,
  },
  {
    title: 'Customer Satisfaction',
    description:
      'We are committed to providing the best customer service possible.',
    icon: Headset,
  },
  {
    title: 'Teamwork',
    description:
      'We believe that great things are achieved through collaboration.',
    icon: Users,
  },
  {
    title: 'Health, Safety and Environment',
    description:
      'We maintain a strict commitment to health, safety, environmental sustainability, and quality across all operations, with zero tolerance for non-compliance. ',
    icon: AlertTriangle,
  },
];

interface ValueProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Value = ({ icon, title, description }: ValueProps) => {
  return (
    <div
      className={cn(
        'w-48 md:w-64 aspect-[9/10] shrink-0 p-4 md:p-6 border',
        'flex flex-col items-center justify-center gap-3 md:gap-4',
        'text-background hexagon-clip moving-gradient *:cursor-default',
        'group overflow-hidden'
      )}>
      <div
        className={cn(
          'w-full flex flex-col items-center gap-3 md:gap-4',
          'opacity-100 group-hover:opacity-0 transition-all duration-300'
        )}>
        {React.createElement(icon, { className: '', size: 36 })}
        <h4 className="text-center text-sm md:text-base !text-background leading-tight px-2">
          {title}
        </h4>
      </div>

      <p
        className={cn(
          'absolute max-w-44 md:max-w-48 px-2',
          '!text-xs md:!text-sm text-center !text-background',
          '!opacity-0 group-hover:!opacity-100 transition-all duration-300'
        )}>
        {description}
      </p>
    </div>
  );
};

export default function CoreValues() {
  return (
    <section className="overflow-x-hidden">
      <h1 className="w-fit mx-auto mb-8 md:mb-12 lines-header">
        our core values
      </h1>

      <div className="w-max flex gap-3 md:gap-4 animate-marquee marquee-20 md:marquee-30">
        {/* Fewer repetitions on mobile for better performance */}
        <div className="flex gap-3 md:gap-4 md:hidden">
          {[...values, ...values, ...values].map((value, index) => (
            <Value key={`mobile-${index}`} {...value} />
          ))}
        </div>

        {/* Original repetitions for desktop */}
        <div className="hidden md:flex gap-4">
          {[...values, ...values, ...values, ...values, ...values].map(
            (value, index) => (
              <Value key={`desktop-${index}`} {...value} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

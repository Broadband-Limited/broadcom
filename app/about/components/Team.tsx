'use client';

import { members } from '@/shared/data/team';
import { generateTeamMemberSlug } from '@/lib/utils';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Team() {
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get CEO (first member) and other team members
  const [ceo, ...otherMembers] = members;

  // Check scroll position and update button visibility
  const checkScrollButtons = (): void => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Handle scroll button clicks
  const scrollLeft = (): void => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
    scrollContainerRef.current.scrollBy({
      left: -(cardWidth + 24), // card width + gap
      behavior: 'smooth',
    });
  };

  const scrollRight = (): void => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
    scrollContainerRef.current.scrollBy({
      left: cardWidth + 24, // card width + gap
      behavior: 'smooth',
    });
  };

  // Check scroll buttons on mount and resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = (): void => checkScrollButtons();
    const handleResize = (): void => {
      setTimeout(checkScrollButtons, 100); // Delay to ensure layout is updated
    };

    // Initial check
    checkScrollButtons();

    // Add event listeners
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="leadership-team" className="w-full flex flex-col gap-12">
      <h1 className="w-fit mx-auto mb-12 lines-header">Leadership Team</h1>

      {/* CEO Card - Full Width */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-lg p-8">
        {/* CEO Image */}
        <Image
          src={ceo.image}
          alt={ceo.name}
          width={1000}
          height={1000}
          className="w-full md:w-64 aspect-[4/5] !object-contain"
        />

        {/* CEO Text Content */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-2">{ceo.name}</h3>
            <p className="!text-dark-blue/80 font-medium mb-4">{ceo.role}</p>
          </div>

          {/* Quote Section */}
          <blockquote className="border-l-4 border-light-blue pl-6 italic">
            <p className="!text-foreground/90 text-lg leading-relaxed text-justify">
              &ldquo;Leading Broadband Group has been an incredible journey of
              innovation and growth. Our commitment to excellence in
              telecommunications continues to drive us forward, connecting
              communities across East Africa.&rdquo;
            </p>
          </blockquote>

          <Button
            href={`/about/team/${generateTeamMemberSlug(ceo.name, ceo.role)}`}
            className="">
            Read Full Bio
          </Button>
        </div>
      </div>

      {/* Other Team Members Grid */}
      <div className="relative">
        {/* Left Scroll Button */}
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
            aria-label="Scroll left">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Right Scroll Button */}
        {showRightButton && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 border border-gray-200"
            aria-label="Scroll right">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row overflow-x-scroll hide-scrollbar gap-8 px-8 md:px-0">
          {otherMembers.map((member) => (
            <div
              key={member.name}
              className="bg-background rounded-xs overflow-hidden w-full md:w-[22.5%] shrink-0 group">
              {/* Member Image */}
              <Image
                src={member.image}
                alt={member.name}
                width={1000}
                height={1000}
                className="w-full aspect-[4/5] transition-transform duration-300 group-hover:scale-105"
              />

              {/* Member Info */}
              <div className="py-6">
                <h4 className="mb-2">{member.name}</h4>
                <p className="!text-sm mb-4 h-12">{member.role}</p>

                <Button
                  href={`/about/team/${generateTeamMemberSlug(
                    member.name,
                    member.role
                  )}`}
                  size="sm"
                  className="mt-auto">
                  Read Full Bio
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

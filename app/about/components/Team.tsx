'use client';

import { members } from '@/shared/data/team';
import { generateTeamMemberSlug } from '@/lib/utils';
import Image from 'next/image';
import Button from '@/shared/components/ui/Button';

export default function Team() {
  // Get CEO (first member) and other team members
  const [ceo, ...otherMembers] = members;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:px-24">
        {otherMembers.map((member) => (
          <div
            key={member.name}
            className="bg-background rounded-xs overflow-hidden group">
            {/* Member Image */}
            <div className="w-full aspect-[4/5] overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                width={350}
                height={350}
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

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
    </section>
  );
}

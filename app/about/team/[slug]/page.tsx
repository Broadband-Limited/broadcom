import { members } from '@/shared/data/team';
import { generateTeamMemberSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TeamMemberPageProps {
  params: {
    slug: string;
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  // Find the team member by matching the slug
  const member = members.find(
    (m) => generateTeamMemberSlug(m.name, m.role) === params.slug
  );

  if (!member) {
    notFound();
  }

  return (
    <section className="bg-gradient-to-b from-light-blue/10 to-background md:!py-16">
      {/* Back Button */}
      <Link
        href="/about#leadership-team"
        className="inline-flex items-center gap-2 text-dark-blue hover:text-dark-blue/80 transition-colors duration-300 mb-8">
        <ArrowLeft size={20} />
        Back
      </Link>

      {/* Member Profile */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Member Image */}
        <div className="md:col-span-1">
          <Image
            src={member.image}
            alt={member.name}
            width={1000}
            height={1000}
            className="w-full aspect-[4/5] rounded border border-dark-blue"
          />
        </div>

        {/* Member Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="!text-dark-blue mb-2">
              {member.name}
            </h1>
            <p className="!text-dark-blue/80 text-xl font-medium">
              {member.role}
            </p>
          </div>

          {/* CEO Quote (only for CEO) */}
          {member.role === 'CEO' && (
            <blockquote className="border-l-4 border-light-blue pl-6 italic bg-light-blue/5 p-4 rounded-r-lg">
              <p className="!text-foreground/90 text-lg leading-relaxed">
                &ldquo;Leading Broadband Group has been an incredible journey of
                innovation and growth. Our commitment to excellence in
                telecommunications continues to drive us forward, connecting
                communities across East Africa.&rdquo;
              </p>
            </blockquote>
          )}

          {/* Full Description */}
          <div className="prose prose-lg max-w-none">
            <p className="!text-foreground/80 leading-relaxed text-lg">
              {member.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Generate static params for all team members
export function generateStaticParams() {
  return members.map((member) => ({
    slug: generateTeamMemberSlug(member.name, member.role),
  }));
}

// Generate metadata for each team member
export function generateMetadata({ params }: TeamMemberPageProps) {
  const member = members.find(
    (m) => generateTeamMemberSlug(m.name, m.role) === params.slug
  );

  if (!member) {
    return {
      title: 'Team Member Not Found',
    };
  }

  return {
    title: `${member.name} - ${member.role} | Broadband Group`,
    description: member.description,
  };
}

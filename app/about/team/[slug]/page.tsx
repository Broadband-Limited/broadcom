import { members } from '@/shared/data/team';
import { generateTeamMemberSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TeamMemberPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  // Find the team member by matching the slug
  const slug = (await params).slug;
  const member = members.find(
    (m) => generateTeamMemberSlug(m.name, m.role) === slug
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

      <div className="">
        <Image
          src={member.image}
          alt={member.name}
          width={1000}
          height={1000}
          className="w-full md:w-72 aspect-[4/5] rounded border border-dark-blue float-left md:mr-6"
        />

        <div className="md:col-span-2 space-y-6">
          <h1 className="!text-dark-blue mb-2">{member.name}</h1>
          <p className="!text-dark-blue/80 text-xl font-medium">
            {member.role}
          </p>

          <p className="!text-foreground/80 leading-relaxed text-lg">
            {member.description}
          </p>
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
export async function generateMetadata({ params }: TeamMemberPageProps) {
  const slug = (await params).slug;
  const member = members.find(
    (m) => generateTeamMemberSlug(m.name, m.role) === slug
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

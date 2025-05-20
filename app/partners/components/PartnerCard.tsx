import { Partner } from '@/lib/types/partner_types';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPartnerImageUrl } from '@/lib/storage';

interface PartnerCardProps {
  partner: Partner;
  index: number;
  total: number;
}

const PartnerCard = ({ partner, index, total }: PartnerCardProps) => {
  return (
    <div
      className={`w-full border-t py-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-24 ${
        index === total - 1 && 'border-b'
      }`}>
      <Image
        src={getPartnerImageUrl(partner.image)}
        alt={`Broadband Communication Networks Ltd and ${partner.name} partnership`}
        width={500}
        height={500}
        className={`w-full md:w-1/2 aspect-square overflow-hidden border border-cyan shadow-2xl ${
          index % 2 === 0 && 'md:order-1'
        }`}
      />

      <div className="w-full md:w-1/2">
        <Link
          href={partner.link}
          target="_blank"
          className="flex items-center gap-2 text-purple border-b border-purple w-fit mb-4 pb-1 px-1 md:hover:border-transparent transition-all duration-300">
          <h3>{partner.name}</h3>
          <ExternalLink size={24} />
        </Link>

        <p className="whitespace-pre-wrap !text-sm md:text-base">
          {partner.description}
        </p>
      </div>
    </div>
  );
};

export default PartnerCard;

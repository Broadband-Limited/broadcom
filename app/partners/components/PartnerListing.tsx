import { Partner } from '@/lib/types/partner_types';
import PartnerCard from './PartnerCard';

interface PartnerListingProps {
  partners: Partner[];
}

const PartnerListing = ({ partners }: PartnerListingProps) => {
  // Sort partners by rank if available
  const sortedPartners = [...partners].sort(
    (a, b) => (a.rank || 0) - (b.rank || 0)
  );

  return (
    <section className="!py-12 flex flex-col gap-0">
      <h2 className="text-center mb-12">our partners include:</h2>

      {sortedPartners.map((partner, index) => (
        <PartnerCard
          key={partner.id || index}
          partner={partner}
          index={index}
          total={sortedPartners.length}
        />
      ))}
    </section>
  );
};

export default PartnerListing;

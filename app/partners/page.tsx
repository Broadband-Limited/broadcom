import CTA from './components/CTA';
import Hero from './components/Hero';
import PartnerListing from './components/PartnerListing';
import { getPartnersNoAuth } from '@/lib/db/partners';

export default async function PartnersPage() {
  // Fetch partners from the database
  const { data: partners = [] } = await getPartnersNoAuth();

  return (
    <>
      <Hero />
      <PartnerListing partners={partners} />
      <CTA />
    </>
  );
}

import { partners } from "@/shared/data/partners";
import PartnerCard from "./PartnerCard";

const PartnerListing = () => {
  return (
    <section className="!py-12 flex flex-col gap-0">
      <h2 className="text-center mb-12">our partners include:</h2>

      {partners.map((partner, index) => (
        <PartnerCard key={index} {...partner} />
      ))}
    </section>
  )
}

export default PartnerListing;
import ContactUs from './(home)/components/ContactUs';
import CoreSolutions from './(home)/components/CoreSolutions';
import Hero from './(home)/components/Hero';
import RegionalPresence from './(home)/components/RegionalPresence';
import Who from './(home)/components/Who';
import WhyUs from './(home)/components/WhyUs';

export default function Home() {
  return (
    <>
      <Hero />
      <Who />
      <RegionalPresence />
      <CoreSolutions />
      <WhyUs />
      <ContactUs />
    </>
  );
}

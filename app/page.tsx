import Hero from './(home)/components/Hero';
import What from './(home)/components/What';
import Who from './(home)/components/Who';
import WhyUs from './(home)/components/WhyUs';
import RegionalPresence from './(home)/components/RegionalPresence';
import ReachOut from './about/components/ReachOut';

export default function Home() {
  return (
    <>
      <Hero />
      <Who />
      <RegionalPresence />
      <What />
      <WhyUs />
      <ReachOut />
    </>
  );
}

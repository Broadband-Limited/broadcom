import CoreValues from './components/CoreValues';
import Hero from './components/Hero';
import HSEStatement from './components/HSEStatement';
import Mission from './components/Mission';
import Partners from './components/Partners';
import QualityPolicy from './components/QualityPolicy';
import ReachOut from './components/ReachOut';
import Team from './components/Team';

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Mission />
      <QualityPolicy />
      <HSEStatement />
      <CoreValues />
      <Team />
      <Partners />
      <ReachOut />
    </>
  );
}

import WhyUs from "../(home)/components/WhyUs";
import Collaborations from "./components/Collaborations";
import CoreValues from "./components/CoreValues";
import Hero from "./components/Hero";
import History from "./components/History";
import Mission from "./components/Mission";
import ReachOut from "./components/ReachOut";
import Services from "./components/Services";
import Team from "./components/Team";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Mission />
      <CoreValues />
      <History />
      <Services />
      <Team />
      <Collaborations />
      <WhyUs />
      <ReachOut />
    </>
  );
}

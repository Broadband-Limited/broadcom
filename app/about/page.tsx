import WhyUs from "../(home)/components/WhyUs";
import CoreValues from "./components/CoreValues";
import Hero from "./components/Hero";
import History from "./components/History";
import Mission from "./components/Mission";
import Partners from "./components/Partners";
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
      <Partners />
      <WhyUs />
      <ReachOut />
    </>
  );
}

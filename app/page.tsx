import ContactUs from './(home)/components/ContactUs';
import Hero from './(home)/components/Hero';
import What from './(home)/components/What';
import Who from './(home)/components/Who';
import WhyUs from './(home)/components/WhyUs';

export default function Home() {
  return (
    <>
      <Hero />
      <Who />
      <What />
      <WhyUs />
      <ContactUs />
    </>
  );
}

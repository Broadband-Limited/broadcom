interface CarouselHighlight {
  image: string;
  title: string;
  desc: string;
  href: string;
}

export const CarouselHighlights: CarouselHighlight[] = [
  {
    image: 'broadcom',
    title: 'Broadband Communication Network.',
    desc: "We're a technology solution provider, utilizing advanced technologies to address requirements for Mobile and Fixed Network Operators, ISPs, Communication Regulators and Enterprise ICT solutions and services in Africa.",
    href: '/about',
  },
  {
    image: 'network_solutions',
    title: 'End-to-End Network Solutions',
    desc: 'From Mobile Broadband, Transmission Network, Fiber Optics, Data Centers, Power Systems, Cooling, IT Networks and Quality of Service Solutions, we provide comprehensive Information Communication Technology (ICT) solutions and services to support network operators and enterprises across Africa.',
    href: '/products/gsm-network-optimization',
  },
  {
    image: 'green_energy',
    title: 'Green Energy Solutions',
    desc: 'With our solar, wind, and hybrid energy systems, we offer sustainable energy solutions and services, tailored for Telecom Infrastructure, Data Centers and Enterprise requirements.',
    href: '/products/green-energy-solutions',
  },
];
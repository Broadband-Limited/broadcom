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
    desc: "We are a technology solution provider, utilizing advanced technologies to address requirements for Communication Network Operators, ISPs, Communication Regulators and Enterprise ICT Solutions and Services in Africa. Our engineers have implemented successful telecom and data center projects across Africa. This includes: Zimbabwe, Angola, Malawi, Cameroon, Nigeria, Mali, Tanzania, Congo B, Gabon, Sudan, South Sudan, Ethiopia, Madagascar, Seychelles, Somalia, Somaliland, Zambia, Burundi, Rwanda besides many in Kenya.",
    href: '/about',
  },
  {
    image: 'network_solutions',
    title: 'End-to-End Network Solutions',
    desc: 'From Mobile Broadband, Transmission Network, Fiber Optics, Data Centers Infrastructure, Power Systems, Cooling, IT Networks and Quality of Service Solutions, we provide comprehensive Information Communication Technology (ICT) Solutions and Services to support Network Operators and Enterprises across Africa.',
    href: '/products/gsm-network-optimization',
  },
  {
    image: 'green_energy',
    title: 'Green Energy Solutions',
    desc: 'With our Solar, Wind, Battery and Hybrid Energy Solutions, we offer sustainable energy Solutions and Services, tailored for Telecom Infrastructure, Data Centers, Enterprise, Electro-mobility and Home requirements.',
    href: '/products/green-energy-solutions',
  },
];
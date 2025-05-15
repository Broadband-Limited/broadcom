export interface Service {
  title: string;
  slug: string;
  description: string;
  details: string[];
  image: string;
}

export interface Division {
  name: string;
  slug: string;
  description: string;
  services: Service[];
}

export const divisions: Division[] = [
  {
    name: 'Network Implementation Division',
    slug: 'network-implementation-division',
    description:
      'Focused on the physical deployment and optimization of telecommunication networks, this division handles everything from GSM network optimization and site rollouts to tower rigging, civil works, RF network installations, and VSAT setups. Oour expertise ensures robust and reliable connectivity across varied environments.',
    services: [
      {
        title: 'GSM Network Optimizations',
        slug: 'gsm-network-optimization',
        description:
          'We conduct Drive Test to confirm GSM network coverage for our client using TEMS Investigation tool and advice accordingly. \n\n We supply and conduct training on the TEMS investigation tools as well.',
        details: [
          'Installation & commissioning of GSM base stations, GSM antennas, and base station upgrades',
          'Supply and installation of DC and AC power boards, change over units, generators, and GSM sites power upgrades',
          'Installation and commissioning of WIMAX base stations, CPEs, configuration of all associated routers, and maintenance of the data network',
        ],
        image: '/images/products/gsm-optimization.webp',
      },
      {
        title: 'GSM Sites Roll Out',
        slug: 'gsm-sites-roll-out',
        description:
          'Broadband manages turnkey projects right from site acquisition, multi skills surveys and design, site build/construction, network design, installation, configuration & commissioning of GSM network.',
        details: [
          'Site Acquisition: We negotiate for site lease and all site access logistics. \nWe acquire site built approvals from local authorities and seek environmental site built approvals on behalf of our customers.',
          'Site build/construction',
          'Network design, installation, configuration & commissioning',
        ],
        image: '/images/products/gsm-rollout.webp',
      },
      {
        title: 'Tower Rigging',
        slug: 'tower-rigging',
        description:
          'Providing professional tower rigging services for safe and efficient deployment of telecom towers.',
        details: [
          'Tower erection and maintenance',
          'Antenna and transmission line installation',
          'Safety compliance and inspection',
        ],
        image: '/images/products/tower-rigging.webp',
      },
      {
        title: 'Civil Works',
        slug: 'civil-works',
        description:
          'We carry out comprehensive civil works including site preparation, construction, and infrastructure development:',
        details: [
          "Casting of communication tower foundation & tower erection, equipment shelter assembly, building perimeter fence as required by clients, manhole and all associated ducting's.",
          'Complete site power reticulations.',
          'Installation of rectifiers and batteries.',
          'Installation and commissioning of generators.',
          'GSM base stations installation and commissioning.',
          'Microwaves installation and commissioning.',
          'Complete site as built documentation.',
        ],
        image: '/images/products/civil-works.webp',
      },
      {
        title: 'RF Networks',
        slug: 'rf-networks',
        description:
          "Having a mobile network meeting all customers' requirements is a big challenge. \nThis is because the topology of the earth is very irregular. Buildings, tunnels, hills and valleys complicate Optimization of RF planning. \n\nIn this regards, we have on board RF repeater solutions operating in all mobile technologies. Our partner in these solutions is REMOTEK who are ISO certified to design and manufacture these solutions.",
        details: [
          'The offering include; GSM, UMTS, CDMA, UCDMA, Multi-band, Fiber optic repeaters, Cable boaster (Line amplifier) etc.',
          'Detailed microwave radio network planning for both point to point transmission and point to multipoint access systems.',
          'Installation and commissioning of various radio systems ranging from VHF, UHF, PDH to SDH.',
        ],
        image: '/images/products/rf-networks.webp',
      },
      {
        title: 'VSAT Installation',
        slug: 'vsat-installation',
        description:
          'Expert VSAT installation services for reliable satellite communication, ensuring seamless connectivity in remote and underserved areas.',
        details: [
          'Comprehensive site survey and planning to determine optimal VSAT placement',
          'Professional installation and configuration of VSAT equipment for maximum performance',
          'Ongoing maintenance and support services to ensure continuous and reliable operation',
        ],
        image: '/images/products/vsat-installation.webp',
      },
    ],
  },
  {
    name: 'Solutions Division',
    slug: 'solutions-division',
    description:
      'This division delivers advanced network solutions by integrating state-of-the-art technologies. We offer intelligent transport networks, access and wireless solutions, real-time billing systems, mobile broadband, and green energy solutions, all designed to enhance network efficiency and performance.',
    services: [
      {
        title: 'Intelligent Transport Networks',
        slug: 'intelligent-transport-networks',
        description:
          'We combine optical and digital networking technologies to build efficient, scalable networks using photonic integrated circuits (PICs).',
        details: [
          'Build networks that deliver Terabit SCALE.',
          'Leverage plug-and-play architecture, digital automation, and GMPLS-based network intelligence.',
          'Converge functions, increase density, and reduce power consumption.',
          'Utilize photonic integrated circuits (PICs) to condense optical components onto a single micro-chip.',
          'Combine optical speed with the simplicity of the digital domain.',
        ],
        image: '/images/products/transport-networks.webp',
      },
      {
        title: 'Access Networks',
        slug: 'access-networks',
        description:
          'We partner with Calix to deliver flexible, unified access solutions for simplified network deployment and low operating costs.',
        details: [
          'Streamline broadband network infrastructure for lower operating costs.',
          'Allow subscribers effortless access to content with high-quality service.',
          'Deliver optimal broadband service with flexibility and mobility.',
        ],
        image: '/images/products/access-networks.webp',
      },
      {
        title: 'Wireless Networks',
        slug: 'wireless-networks',
        description:
          'We partner with Rohde & Schwarz to provide world-leading wireless communications and EMC test equipment for over 80 years.',
        details: [
          'Offer test and measurement equipment for wireless communication and digital terrestrial television.',
          'Specialize in spectrum analyzers, RF power meters, and field strength test solutions.',
        ],
        image: '/images/products/wireless-networks.webp',
      },
      {
        title: 'Billing Solutions',
        slug: 'billing-solutions',
        description:
          'Partnering with Redknee, we offer real-time billing and customer care solutions to over 200 service providers worldwide.',
        details: [
          'Deliver real-time monetization software for communications service providers.',
          'Manage provisioning, rating, charging, billing, and customer care.',
          'Help drive revenue, increase profitability, and enhance customer experience.',
        ],
        image: '/images/products/billing-solutions.webp',
      },
      {
        title: 'Mobile Broadband',
        slug: 'mobile-broadband',
        description:
          "As Nokia Networks' reseller, we provide advanced mobile broadband solutions optimized for smart devices and spectrum efficiency.",
        details: [
          'Provide industry-leading cellular access with low power consumption.',
          'Deliver Software Defined Networks (SDN) and extensive small cell coverage.',
          'Enhance subscriber experience with scalable, cost-effective network solutions.',
        ],
        image: '/images/products/mobile-broadband.webp',
      },
      {
        title: 'End To End Network Intelligence',
        slug: 'end-to-end-network-intelligence',
        description:
          'As a partner with Tektronix Communications, we offer telecoms network intelligence solutions for a comprehensive view of networks.',
        details: [
          'Provide customer experience, assurance, and test solutions for fixed and mobile networks.',
          'Cover advanced technologies such as LTE, 3G, VoIP, and triple play.',
        ],
        image: '/images/products/end-to-end-network-intelligence.webp',
      },
      {
        title: 'Mobile Network Optimization & Benchmarking Tools',
        slug: 'mobile-network-optimization-benchmarking-tools',
        description:
          'We partner with Ascom TEMS to deliver tools for mobile network optimization, field testing, and network troubleshooting.',
        details: [
          'Enable field testing and automated data processing for mobile networks.',
          'Flagship products include TEMS Investigation, TEMS Discovery, and TEMS Monitor Master.',
        ],
        image: '/images/products/mobile-network-optimization.webp',
      },
      {
        title: 'Optic Fibre Solutions',
        slug: 'optic-fibre-solutions',
        description:
          'We provide advanced fiber optic testing, monitoring, and installation solutions in partnership with VIAVI and Calix.',
        details: [
          'Deliver fiber optic tools for installation, testing, and monitoring of networks.',
          'Provide solutions for GPON and Active Ethernet (AE) fiber access technologies.',
          "Monitor fiber networks end-to-end with VIAVI's test solutions.",
        ],
        image: '/images/products/optic-fibre-solutions.webp',
      },
      {
        title: 'Green Energy Solutions',
        slug: 'green-energy-solutions',
        description:
          'We offer customized green energy solutions, including solar and wind power systems, to reduce reliance on diesel electricity.',
        details: [
          'Design and deploy renewable energy systems tailored to specific site needs.',
          'Utilize smart controllers and remote management to reduce operational costs.',
        ],
        image: '/images/products/green-energy-solutions.webp',
      },
      {
        title: 'M2M',
        slug: 'm2m',
        description:
          'We develop customized Machine-to-Machine (M2M) solutions for smart metering, vending, and lift systems.',
        details: [
          'Offer Smart Water Meters with advanced technical innovations and prepaid meter functions.',
          'Provide energy metering solutions in partnership with Yantai Dongfang Wisdom Electric Co.,Ltd.',
        ],
        image: '/images/products/m2m.webp',
      },
    ],
  },
  {
    name: 'Managed Services Division',
    slug: 'managed-services-division',
    description:
      'Dedicated to maintaining operational continuity, this division provides comprehensive support and maintenance services. Our portfolio includes routine maintenance for generators, air conditioners, battery banks, rectifier & inverter systems, as well as solar, wind, and security systems, ensuring that all telecom infrastructure operates at peak efficiency.',
    services: [
      {
        title: 'Generators',
        slug: 'generators',
        description:
          'Our skilled personnel maintain generators per manufacturer recommendations to ensure optimal performance. \nRoutine checks, cleanings, and system tests are done regularly.',
        details: [
          'Mobile generators deployed fast in case of breakdowns.',
          "Maintenance tracked per manufacturer's specifications.",
          'Overhauls handled by qualified technicians.',
        ],
        image: '/images/products/generators.webp',
      },
      {
        title: 'Air Conditioner Systems',
        slug: 'air-conditioner-systems',
        description:
          'Air conditioners are cleaned, repaired, and maintained to ensure they are running optimally at all times.',
        details: [
          'Filters are cleaned or replaced regularly.',
          'Refrigerant levels are maintained per manufacturer recommendations.',
          'Casings are inspected, and changeover cycling is tested.',
        ],
        image: '/images/products/air-conditioner-systems.webp',
      },
      {
        title: 'Battery Banks',
        slug: 'battery-banks',
        description:
          'We provide regular maintenance of battery banks to ensure optimal performance and longevity.',
        details: [
          'Regular voltage readings and connections checks.',
          'Discharge tests performed according to manufacturer guidelines.',
          'Early battery issues detected using MEGGER BATTERY TESTER.',
        ],
        image: '/images/products/battery-banks.webp',
      },
      {
        title: 'Rectifier & Inverter Systems',
        slug: 'rectifier-inverter-systems',
        description:
          'We perform comprehensive maintenance on rectifiers and inverters, ensuring all components are within the recommended specifications.',
        details: [
          'Visual alarms are inspected and resolved.',
          'Input and output voltages and currents are measured for accuracy.',
          'System loading is analyzed, and upgrades are recommended where necessary.',
        ],
        image: '/images/products/rectifier-inverter-systems.webp',
      },
      {
        title: 'Solar Systems',
        slug: 'solar-systems',
        description:
          'Periodic maintenance ensures solar systems perform optimally, with immediate replacement of damaged modules.',
        details: [
          'Solar panels are regularly cleaned to maximize power output.',
          'Visual inspections performed to detect damage.',
          'Damaged modules are replaced during maintenance.',
        ],
        image: '/images/products/solar-systems.webp',
      },
      {
        title: 'Wind Systems',
        slug: 'wind-systems',
        description:
          'Wind turbine maintenance is performed by certified technicians trained in safety protocols.',
        details: [
          'Technicians undergo regular height and safety training.',
          'Mechanical brakes are engaged during maintenance for safety.',
          'Maintenance is avoided when wind exceeds 10 m/s for safety.',
        ],
        image: '/images/products/wind-systems.webp',
      },
      {
        title: 'Site Fueling',
        slug: 'site-fueling',
        description:
          'We ensure reliable site fueling services, preventing service outages due to lack of fuel.',
        details: [
          'Fuel schedules are planned based on site conditions and generator consumption.',
          'Fueling process is carefully managed to prevent spillage.',
          'We ensure no site goes out of service due to fuel shortages.',
        ],
        image: '/images/products/site-fueling.webp',
      },
      {
        title: 'Grid Power Management',
        slug: 'grid-power-management',
        description:
          'We monitor grid power, ensuring consistent and reliable electricity supply to all sites.',
        details: [
          'KPLC connections are monitored to ensure voltage consistency.',
          'Damaged devices like circuit breakers are replaced promptly.',
          'Scheduled outages are managed to minimize service disruptions.',
        ],
        image: '/images/products/grid-power-management.webp',
      },
      {
        title: 'Environmental Alarm Monitoring & Escalation',
        slug: 'environmental-alarm-monitoring-escalation',
        description:
          'Our NMC monitors site alarms, ensuring timely escalation and minimum downtime.',
        details: [
          'We have reduced faults by over 30% through proactive monitoring.',
          'Escalation procedures are strictly followed per SLA guidelines.',
          'Strategic plans and flow charts ensure efficient event resolution.',
        ],
        image: '/images/products/environmental-alarm-monitoring.webp',
      },
      {
        title: 'Site Facilitation & Control',
        slug: 'site-facilitation-control',
        description:
          'We facilitate contractor access to sites and monitor alarms to ensure security and compliance.',
        details: [
          'Intrusion alarms are monitored and escalated accordingly.',
          'Contractor access is facilitated with proper approval processes.',
          'Violations by contractors are managed according to agreements.',
        ],
        image: '/images/products/site-facilitation-control.webp',
      },
      {
        title: 'Site Security',
        slug: 'site-security',
        description:
          'We ensure site infrastructure is safe through our contracts with security firms.',
        details: [
          'Alarms are directly connected to the local radio commander.',
          'Security contracts ensure fast response times.',
          'Sites are protected with robust infrastructure security.',
        ],
        image: '/images/products/site-security.webp',
      },
      {
        title: 'Electric Fence',
        slug: 'electric-fence',
        description:
          'We maintain electric fences to ensure structural integrity and operational efficiency.',
        details: [
          'Fence strands are checked for tension and replaced if sagging.',
          'Faulty insulators and strainers are replaced with high-quality components.',
          'Energizer batteries are regularly checked to maintain functionality.',
        ],
        image: '/images/products/electric-fence.webp',
      },
    ],
  },
  {
    name: 'Enterprise Division',
    slug: 'enterprise-division',
    description:
      'Enterprise Division is geared toward delivering tailored, scalable IT solutions for large businesses. Our focus is on integrating secure, reliable, and efficient enterprise network infrastructures to drive digital transformation and support corporate growth.',
    services: [
      {
        title: 'Enterprise Network Infrastructure',
        slug: 'enterprise-network-infrastructure',
        description:
          'Delivering comprehensive and scalable IT solutions tailored to enterprise needs. This service ensures robust data connectivity, secure networking, and seamless system integration to empower business growth.',
        details: [
          'Custom network design and implementation',
          'Integration with cloud and on-premise systems',
          'Ongoing support and maintenance',
          'Enhanced security and compliance measures',
        ],
        image: '/images/products/enterprise-network-infrastructure.webp',
      },
    ],
  },
] as const;

// Utility types for accessing division and service data
export type DivisionSlug = (typeof divisions)[number]['slug'];
export type ServiceSlug =
  (typeof divisions)[number]['services'][number]['slug'];

// Utility functions for accessing data
export const getDivisionBySlug = (slug: DivisionSlug): Division | undefined => {
  return divisions.find((division) => division.slug === slug);
};

export const getServiceBySlug = (slug: ServiceSlug): Service | undefined => {
  for (const division of divisions) {
    const service = division.services.find((service) => service.slug === slug);
    if (service) return service;
  }
  return undefined;
};

export const getAllServices = (): Service[] => {
  return divisions.flatMap((division) => division.services);
};

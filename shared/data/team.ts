export interface TeamMember {
  role: string
  name: string
  image: string
  description: string
}

export const members: TeamMember[] = [
  {
    role: 'CEO',
    name: 'Bernard G. Wahome',
    image: '/images/team/bernard.webp',
    description:
      'Bernard is the Founder, CEO, and Managing Director of Broadband Group with 28 years of experience in Telecommunications. He has driven mobile network deployments across East Africa. Bernard holds an MBA (JKUAT), Mini Telecom MBA (UK), BSc IT (JKUAT), and a Telecom Engineering Diploma. He is a member of the Kenya Institute of Management (KIM) and is committed to ICT transformation and improving customer experience across Africa.',
  },
  {
    role: 'General Manager, Managed Services',
    name: 'Edwin Wafula',
    image: '/images/team/patrick.webp',
    description:
      'Edwin is the GM of Managed Services at Broadband Group, handling Business Development, Service Management, and Key Accounts. With 25 years in Telecoms, his experience spans PSTN and PLMN networks, having held management roles at Telekom Kenya, Vivendi, Celtel, and Nokia Siemens. He holds a Diploma in Telecom (KNEC), Advanced Diploma from Multimedia University, and a Mini MBA from Wits Business School. He focuses on business processes re-engineering, innovation, and operational excellence.',
  },
  {
    role: 'General Manager, Finance and Administration',
    name: 'Susan Gichia',
    image: '/images/team/susan.webp',
    description:
      'Susan, GM of Finance & Admin, directs financial management, ensuring resource optimization to meet the company’s goals. With 27 years in various industries, she has expertise in product costing, project accounting, and statutory regulations. Susan’s aim is to enhance internal and external customer experiences while driving financial growth. She holds a degree from Strathmore University and is a member of ICPAK.',
  },
  {
    role: 'General Manager, Implementation Solutions',
    name: 'Michael Wambugu',
    image: '/images/team/michael.webp',
    description:
      'Michael is the GM of Implementation at Broadband Group, leading project rollouts from initiation to closure. He has 14 years of expertise in project and technical schedule management, focusing on high-standard operations and business growth. Michael’s leadership has driven effective in-house teams and project success. He holds an MBA in Strategic Management from Moi University and a Civil Engineering degree from the University of Nairobi.',
  },
]
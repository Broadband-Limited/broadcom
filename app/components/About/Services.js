import { CellTowerOutlined, WifiOutlined } from '@mui/icons-material'
import { EngineeringOutlined } from '@mui/icons-material'
import { MiscellaneousServicesOutlined } from '@mui/icons-material'
import Image from 'next/image'

const divisions = [
  {
    title: 'Network Implementation Division',
    description:
      'Specializing in the design, installation, and optimization of wireless and wireline networks, we offer solutions for GSM, UMTS, CDMA, and other systems. Our engineers have successfully executed projects in over 10 African countries.',
    image: '/images/net.webp',
    muiIcon: CellTowerOutlined,
  },
  {
    title: 'Managed Services Division',
    description:
      'We provide comprehensive network maintenance, ensuring that both active and passive network components are continuously monitored and optimized. Our services cover power management, site security, and environmental monitoring, ensuring the smooth operation of critical infrastructure.',
    image: '/images/managed-services.webp',
    muiIcon: EngineeringOutlined,
  },
  {
    title: 'Solutions Division',
    description:
      'From network intelligence to green energy initiatives, we offer innovative solutions tailored to the needs of our clients. Our partnerships with industry leaders like Nokia and RedKnee enable us to deliver advanced technologies such as mobile broadband, machine-to-machine (M2M) communication, and energy-efficient systems.',
    image: '/images/solutions-division.webp',
    muiIcon: WifiOutlined,
  },
]

const Services = () => {
  return (
    <section className="flex flex-col gap-8 md:px-64 mb-16">
      <div className="w-full flex items-center gap-4 appear">
        <MiscellaneousServicesOutlined
          fontSize="large"
          className="opacity-50"
        />
        <h2 className="text-2xl font-bold">Our services</h2>
      </div>
      <p className="text-gray-600 appear">
        Broadcom&apos;s expertise is divided into three key divisions:
      </p>

      <div className="services w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        {divisions.map((division, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 md:gap-6 md:border-2 border-x-blue-500 border-opacity-20 hover:border-opacity-100 md:p-4 appear"
          >
            <div className="image w-full aspect-[16/9] overflow-hidden">
              <Image
                src={division.image}
                alt={`broadcom ${division.title}`}
                width={500}
                height={500}
              />
            </div>
            <div className="w-full flex items-center gap-2">
              <division.muiIcon className="icon opacity-50" />
              <h4 className="font-semibold text-r-blue">{division.title}</h4>
            </div>
            <p className="text-gray-700 text-sm">{division.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services

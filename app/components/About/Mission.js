import { RocketLaunchOutlined } from '@mui/icons-material'
import Image from 'next/image'

const Mission = () => {
  return (
    <section className="flex flex-col gap-8 md:px-64 mb-16">
      <div className="w-full flex items-center gap-4">
        <RocketLaunchOutlined fontSize="large" className="opacity-50" />
        <h2 className="text-2xl font-bold">Our Mission</h2>
      </div>
      <p className="text-gray-600">
        At Broadcom, our mission is to enable seamless communication and
        optimize network performance through innovative solutions. We aim to
        enhance connectivity across diverse sectors, ensuring that our clients —
        mobile operators, governments, and businesses — have access to the
        latest technology and tools that enable them to serve their customers
        more effectively.
      </p>

      <div className="flex-shrink-0 w-full h-auto md:aspect-[16/9] overflow-hidden">
        <Image
          alt="Broadcom Services"
          src={'/images/mission.webp'}
          width={500}
          height={500}
          className=""
        />
      </div>
    </section>
  )
}

export default Mission
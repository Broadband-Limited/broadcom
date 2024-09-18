import { PeopleAltOutlined } from '@mui/icons-material';
import Image from 'next/image'

const Who = () => {
  return (
    <section className="flex flex-col gap-8 md:px-64 mb-16">
      <div className="w-full flex items-center gap-4 appear">
        <PeopleAltOutlined fontSize='large' className='opacity-50' />
        <h2 className="text-2xl font-bold">who we are</h2>
      </div>
      <p className="text-gray-600 appear">
        Broadband Communication Networks Limited (Broadcom) is a leading African
        provider of telecommunications and network solutions.
      </p>

      <div className="flex-shrink-0 w-full h-auto md:aspect-[16/9] overflow-hidden appearFromLeft">
        <Image
          alt="Broadcom Services"
          src={'/images/map.webp'}
          width={1000}
          height={1000}
          className="scale-[180%]"
        />
      </div>

      <p className="text-gray-600 appear">
        Headquartered in Nairobi, Kenya, with subsidiaries in Tanzania,
        Ethiopia, and Zimbabwe, we deliver cutting-edge solutions that empower
        mobile operators, governments, and businesses to enhance their network
        capabilities. <br /> <br /> Our extensive expertise spans across network
        implementation, managed services, and advanced technology solutions,
        making us a trusted partner in advancing communication across Africa.
      </p>
    </section>
  )
}

export default Who;
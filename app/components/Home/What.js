import CustomButton from '../CustomButton'
import DataAi from '../DataAi'
import DigitalTrans from '../DigitalTrans'
import ProductDev from '../ProductDev'

const ServiceCard = ({ Icon, title, description }) => (
  <article className="flex flex-col gap-8">
    <div className="flex items-center md:flex-col md:items-start gap-4">
      <Icon />
      <h3 className="text-xl gelasio">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </article>
)

const servicesData = [
  {
    Icon: DigitalTrans,
    title: 'Telecom Network Solutions',
    description:
      'We provide a range of telecom network services, including installation, maintenance, and tailored solutions for wireless and wireline technologies like mobile networks and fiber optics.',
  },
  {
    Icon: DataAi,
    title: 'Managed Network Services',
    description:
      'Our managed services ensure optimal performance with proactive monitoring, troubleshooting, and support to keep your network running smoothly.',
  },
  {
    Icon: ProductDev,
    title: 'Network Design & Implementation',
    description:
      'We design and implement telecom networks, offering end-to-end services from planning to deployment for wireless and wireline systems.',
  },
]

const What = () => {
  return (
    <section className="min-h-screen relative overflow-x-hidden flex flex-col gap-8 md:px-64">
      <h2 className="flex items-center text-xl isolate container-custom-xs appear ">
        <span className="bg-white pr-2 roboto">WHAT WE CAN DO FOR YOU</span>
        <span className="bg-gray-300 h-[2px] absolute inline-block w-screen -z-10" />
      </h2>

      <div className="services-wrapper w-full flex flex-col">

        <div className="services w-full flex flex-col md:flex-row gap-16 appear">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <CustomButton text="Explore all Services" href='/services' />
      </div>
    </section>
  )
}

export default What

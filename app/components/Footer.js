import { Email, Phone, Place } from '@mui/icons-material'

const ContactItem = ({ icon, text }) => (
  <li className="flex items-center gap-4">
    <div className="opacity-50">{icon}</div>
    <p className='w-full'>{text}</p>
  </li>
)

const ContactSection = ({ title, icon, items }) => (
  <div className='w-full md:w-auto px-8 md:p-0 flex flex-col  gap-4'>
    <h3 className="text-lg text-r-blue">{title}</h3>
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <ContactItem key={index} icon={icon} text={item} />
      ))}
    </ul>
  </div>
)

const Footer = () => {
  const phoneNumbers = [
    '+254-734026409',
    '+254-718896167',
    // '+254-724562063',
    // '+254-20-3746897',
    // '+254-20-3746669',
  ]

  const emails = ['info@broadcom.co.ke', 'sales@broadcom.co.ke']

  const location = ['Kalson Towers, 2nd Floor, Crescent Lane']

  return (
    <footer id="footer" className="mt-24 bg-gray-300">

      <div className="w-full py-12 flex flex-wrap justify-center gap-8 md:gap-16">
        <ContactSection
          title="Call Us"
          icon={<Phone />}
          items={phoneNumbers}
        />

        <ContactSection title="Email Us" icon={<Email />} items={emails} />

        <ContactSection title="Visit Us" icon={<Place />} items={location} />
      </div>

      <div className="copyright bg-black">
        <p className="container-custom-xs text-gray-400 py-5 px-4 text-center text-sm">
          Copyright © 2024 - Broadband Communications Networks Limited
        </p>
      </div>
    </footer>
  )
}

export default Footer

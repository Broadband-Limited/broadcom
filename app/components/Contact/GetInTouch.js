import { CallOutlined, PlaceOutlined } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { TbBrandHipchat, TbMessages } from "react-icons/tb";

const contactItems = [
  {
    icon: TbBrandHipchat,
    title: 'chat with sales',
    prompt: 'Speak with our fiendly team.',
    linkTitle: 'sales@broadcom.co.ke',
    link: 'mailto:sales@broadcom.co.ke'
  },
  {
    icon: TbMessages,
    title: 'chat with support',
    prompt: 'We\'re here to help.',
    linkTitle: 'info@broadcom.co.ke',
    link: 'mailto:info@broadcom.co.ke'
  },
  {
    icon: PlaceOutlined,
    title: 'visit us',
    prompt: 'Visit our HQ office.',
    linkTitle: 'View on Google Maps',
    link: 'https://maps.app.goo.gl/Bj5z79rqsG5bcAvF7'
  },
  {
    icon: CallOutlined,
    title: 'call us',
    prompt: 'Mon-Fri 8am-5pm.',
    linkTitle: '+254-734026409',
    link: 'tel:+254734026409'
  },
] 

const GetInTouch = () => {
  return(
    <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 md:px-64 mb-16">
      {contactItems.map((item, index) => (
        <div key={index} className="w-full aspect-[4/3] flex flex-col justify-between border-2 border-x-blue-500 border-opacity-20 hover:border-opacity-100 p-4 md:shadow-lg">
          <item.icon className="text-5xl opacity-50" />
          <div>
            <h3 className="text-xl mt-4 capitalize">{item.title}</h3>
            <p className="text-gray-600 mt-4">{item.prompt}</p>
            <Link href={item.link} target="_blank" className="text-r-blue mt-4">{item.linkTitle}</Link>
          </div>
        </div>
      ))}
    </section>
  )
}

export default GetInTouch;
import { PublicOutlined } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const Reach = () =>{
  return (
    <section className="flex flex-col gap-8 md:px-64 md:py-32 mb-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/map2.webp')" }}>
      <div className="w-full flex items-center gap-4">
        <PublicOutlined fontSize="large" className="opacity-50" />
        <h2 className="text-2xl font-bold">Our Reach</h2>
      </div>

      <p className="text-gray-600">Broadcom&apos;s footprint extends across key markets in Africa, including Kenya, Uganda, Tanzania, and Sudan. <br /> <br /> Our solutions have been pivotal in expanding mobile networks and establishing critical infrastructure for industries such as public safety, energy, and transportation. <br /> <br /> Whether in urban hubs or remote regions, Broadcom is dedicated to improving communication and connectivity where it matters most.
      </p>
    </section>
  )
}

export default Reach;
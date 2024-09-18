import { VisibilityOutlined } from "@mui/icons-material"
import Image from "next/image";

const Vision = ()=>{
  return(
    <section className="flex flex-col gap-8 md:px-64 mb-16">
      <div className="w-full flex items-center gap-4 appear">
        <VisibilityOutlined fontSize="large" className="opacity-50" />
        <h2 className="text-2xl font-bold">Our vision</h2>
      </div>

      <div className="flex-shrink-0 w-full h-auto md:aspect-[16/9] overflow-hidden appearFromLeft">
        <Image
          alt="Broadcom Services"
          src={'/images/vision.webp'}
          width={500}
          height={500}
          className=""
        />
      </div>

      <p className="text-gray-600 appear">We aspire to be Africa’s leading provider of telecommunications solutions, committed to transforming the ICT landscape through innovation and strategic partnerships. By bridging the digital divide, we aim to improve access to connectivity in both urban and rural areas, enhancing the quality of life across the continent.
      </p>
    </section>
  )
}

export default Vision;
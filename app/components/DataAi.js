import Image from "next/image";

const DataAi = () => {
  return (
    <div className="w-10 h-10 flex-shrink-0">
      <Image 
        src="/images/data-ai.webp"
        alt="data-ai"
        width={80}
        height={80}
        className="w-full h-full"
      />
    </div>
  )
}

export default DataAi;
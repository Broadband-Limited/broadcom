const { default: Image } = require("next/image")

const ProductDev = () => {
  return (
    <div className="w-10 h-10 aspect-square flex-shrink-0">
      <Image 
        src="/images/product-dev.webp"
        alt="product-dev"
        width={200}
        height={200}
        className="w-full h-full"
      />
    </div>
  )
}

export default ProductDev;
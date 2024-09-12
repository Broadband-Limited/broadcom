import Image from 'next/image'

const Landing = () => {
  return (
    <section className="flex flex-col items-center gap-8 md:px-64 mb-16">
      <div className="w-full">
        <h2 className="text-4xl font-bold">
          Bridging Africa with Innovative Telecom. Solutions
        </h2>

        <p className="text-gray-600 mt-8">
          For over two decades, Broadband Communication Networks has been at the
          forefront of telecommunications in Africa. We started our journey in
          2001, just as the mobile industry was beginning to boom across the
          continent. Since then, we&apos;ve watched this sector grow
          exponentially, and we&apos;ve been proud to play a key role in its
          development.
        </p>
      </div>

      <div className="flex-shrink-0 w-screen md:w-full h-auto md:aspect-[16/9] overflow-hidden">
        <Image
          alt="Broadcom Services"
          src={'/images/broadcom.webp'}
          width={1000}
          height={400}
          className="md:object-top"
        />
      </div>
    </section>
  )
}

export default Landing

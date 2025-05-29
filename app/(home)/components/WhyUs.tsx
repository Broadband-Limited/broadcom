import React from 'react'

const points = [
  {
    title: '24+ years',
    description:
      'With over 24 years in the telecom industry, we have built a reputation for delivering high-quality solutions across Africa.',
  },
  {
    title: 'Trusted Partnerships',
    description:
      'Our partnerships with technology global leaders like Nokia, Ericcson, Vertiv, Rohde & Schwarz allows us to provide top-tier Products & Services with cutting-edge technology.',
  },
  {
    title: 'Sustainable Solutions',
    description:
      'We are dedicated to reducing environmental impact by offering green energy solutions tailored to modern telecom needs.',
  },
]

interface PointProps {
  title: string;
  description: string;
}

const Point: React.FC<PointProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="!text-foreground !font-black text-center">{title}</h2>
      <p className='text-center opacity-75'>{description}</p>
    </div>
  )
}

const WhyUs = () => {
  return (
    <section className="bg-background !py-24 flex flex-col gap-8 md:gap-12">
      <h1 className='w-fit mx-auto mb-6 lines-header'>why choose us</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {points.map((point) => (
          <Point key={point.title} {...point} />
        ))}
      </div>
    </section>
  )
}

export default WhyUs
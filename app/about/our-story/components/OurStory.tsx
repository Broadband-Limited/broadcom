import Image from 'next/image';
import React from 'react';

export default function OurStory() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="w-fit mx-auto mb-12 lines-header text-3xl md:text-4xl lg:text-5xl font-bold">
        OUR STORY
      </h1>

      {/* Main story content with image */}
      <div className="flex flex-col gap-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/news.webp"
              alt="Broadband Communication Networks Ltd"
              width={600}
              height={400}
              className="w-full aspect-[4/3] object-cover shadow-xl rounded-sm border border-cyan"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              Founded in 2001, Broadband Communication Networks Ltd began as a
              small, determined telecommunications provider with a bold vision:
              to transform Africa&apos;s connectivity landscape. At a time when
              South African and European companies dominated the market, our
              founder and Managing Director, Bernard Wahome, foresaw a new era,
              one where mobile telecommunication in East Africa would spark
              massive demand for local engineering expertise and reliable
              infrastructure.
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          When mobile operators were first licensed in the region, the
          market&apos;s need was clear: long telephone waiting lists, scarce
          local contractors, and a lack of scalable, responsive telecom
          solutions. Within our first 18 months, we grew from a startup into a
          company with millions in turnover. By staying focused on
          excellence and execution, we doubled our growth year over year until
          stabilizing in 2008 — and we&apos;ve never looked back.
        </p>

        {/* Timeline visual element */}
        <div className="relative py-8 my-8 flex flex-col items-center gap-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-light-blue"></div>

          <div className="flex justify-center">
            <div className="w-16 aspect-square rounded-full bg-dark-blue border-4 border-light-blue flex items-center justify-center text-white font-bold relative z-10">
              2001
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-16 aspect-square rounded-full bg-dark-blue border-4 border-light-blue flex items-center justify-center text-white font-bold relative z-10">
              2008
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-16 aspect-square rounded-full bg-dark-blue border-4 border-light-blue flex items-center justify-center text-white font-bold relative z-10">
              2025
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          Over the past 24 years, we&apos;ve evolved into a Pan-African
          technology solutions provider, delivering telecom and IT
          infrastructure across East, West, and Central Africa. Our expansion is
          fueled by a deep understanding of the continent&apos;s communication
          needs, and a belief that sustainable, high-performance networks are
          foundational to Africa&apos;s development. Today, we operate in Kenya,
          Tanzania, South Sudan, and Ethiopia, with registered entities in
          Uganda and Zambia, and have successfully delivered projects in over 20
          African countries under the names Broadcom, Broadcom Networks, and
          Broadcom Solutions.
        </p>

        {/* Regional presence visualization */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">Kenya</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">Tanzania</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">South Sudan</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">Ethiopia</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">Uganda</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-sm shadow-md text-center">
            <h3 className="font-semibold text-dark-blue">Zambia</h3>
          </div>
        </div>

        {/* Our specializations */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4 text-dark-blue">
            Our Specializations
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            We specialize in end-to-end network solutions and conformance
            testing, managed services, enterprise connectivity, and
            implementation, working with all major telecom vendors globally. Our
            early partnerships with Kencell and later Safaricom positioned us as
            one of the first private sector engineering service providers in
            Kenya&apos;s telecom space. While many of our early competitors have
            since exited the market, we&apos;ve remained a dominant force,
            resilient, adaptable, and future-focused.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-sm shadow-md">
              <h3 className="text-xl font-medium mb-2 text-dark-blue">
                Network Solutions
              </h3>
              <p>End-to-end network solutions and conformance testing</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-sm shadow-md">
              <h3 className="text-xl font-medium mb-2 text-dark-blue">
                Managed Services
              </h3>
              <p>
                Professional management and optimization of network services
              </p>
            </div>
            <div className="p-5 bg-slate-50 rounded-sm shadow-md">
              <h3 className="text-xl font-medium mb-2 text-dark-blue">
                Enterprise Connectivity
              </h3>
              <p>Business-focused connectivity solutions across Africa</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-sm shadow-md">
              <h3 className="text-xl font-medium mb-2 text-dark-blue">
                Implementation
              </h3>
              <p>Expert deployment working with all major telecom vendors</p>
            </div>
          </div>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          Our growth has always been fueled by creativity and innovation; the
          backbone of survival in a dynamic tech landscape. As customer needs
          evolve, so do we. From customer experience management tools to full
          ecosystem solutions in network performance, optimization, and health
          monitoring, we&apos;ve continued to build intelligent systems that
          enable operators to deliver world-class service.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Today, our team includes over 200 permanent staff and over 100 field
          consultants working across the region. We&apos;ve remained committed
          to excellence through continuous investment in training, mentoring,
          and internal process optimization. We are proud to be ISO 9001:2015
          certified, a mark of our commitment to superior quality in both
          delivery and customer service.
        </p>

        {/* Green energy focus */}
        <div className="flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-12 my-6">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/green_energy.webp"
              alt="Green Energy Solutions"
              width={600}
              height={400}
              className="w-full aspect-[4/3] object-cover shadow-xl rounded-sm border border-cyan"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-dark-blue">
              Sustainability Focus
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              To ensure long-term sustainability and business continuity,
              we&apos;ve diversified our offerings while meeting all financial
              obligations responsibly. Health and Safety remain core pillars of
              our risk management approach, embedded into every layer of
              operations. We are also proud to be part of the UN Global Compact,
              with a dedicated focus on sustainable energy solutions. Our green
              energy division is a key arm of our business, driving the rollout
              of alternative power systems that extend energy access beyond the
              national grid, especially to underserved rural communities.
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          Our continued success is grounded in our people, our reputation, and
          our ability to get the work done. We stay informed through industry
          events, adapt quickly to emerging trends, and never miss a chance to
          learn, improve, and lead.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { Globe } from 'lucide-react';

const RegionalPresence = () => {
  const projectCountries = [
    'Zimbabwe',
    'Angola',
    'Malawi',
    'Cameroon',
    'Nigeria',
    'Mali',
    'Congo B',
    'Gabon',
    'Sudan',
    'Madagascar',
    'Seychelles',
  ];

  return (
    <section className="bg-background !py-12 md:!py-24">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4">
            Strengthening Networks Across Diverse African Markets
          </h1>
          <div className="flex items-center justify-center gap-2 text-light-blue mb-6">
            <Globe className="w-6 h-6" />
            <span className="text-lg font-medium">
              24+ Years of African Excellence
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          <p className="">
            Our engineers have successfully delivered telecom projects across
            Africa, including countries such as{' '}
            <span className="font-semibold text-light-blue">
              Zimbabwe, Angola, Malawi, Cameroon, Nigeria, Mali
            </span>
            , and several others across East, West, and Central Africa.
          </p>

          <div>
            <h3 className="text-center font-semibold mb-4">
              Project Delivery Across Africa
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 md:px-32">
              {projectCountries.map((country) => (
                <span
                  key={country}
                  className="bg-gradient-to-r from-light-blue to-dark-blue text-white px-3 py-1 rounded-full text-sm font-medium hover:shadow-lg transition-shadow cursor-default">
                  {country}
                </span>
              ))}
            </div>
          </div>

          <p>
            We have a strong presence in the greater East African region, with
            our headquarters in Nairobi, Kenya. Our operations run under{' '}
            <span className="text-light-blue font-bold">Broadcom</span>,{' '}
            <span className="text-light-blue font-bold">Broadcom Networks</span>
            , or{' '}
            <span className="text-light-blue font-bold">
              Broadcom Solutions
            </span>
            , depending on the country. We are currently active in Kenya,
            Tanzania, South Sudan, and Ethiopia, with registered entities in
            Uganda and Zambia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegionalPresence;

'use client';

import React, { useState } from 'react';
import ContactForm from './ContactForm';
import Offices from './Offices';
import FAQ from './FAQ';
import InfoHub from './InfoHub';

const tabs = [
  { title: 'Form', component: ContactForm },
  { title: 'Offices', component: Offices },
  { title: 'FAQs', component: FAQ },
];

const ContactMethods = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string>('Kenya');

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Reset to Kenya when not viewing the Offices tab
    if (index !== 1) {
      setSelectedCountry('Kenya');
    }
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="tabs w-full md:col-span-2 flex flex-col gap-4">
        <div className="tab-buttons w-full px-6 flex gap-6 md:gap-12 border-b border-black border-opacity-25">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`border-b-2 px-4 ${
                activeTab === index
                  ? 'text-light-blue opacity-100 border-light-blue'
                  : 'text-foreground opacity-60 border-transparent hover:border-light-blue transition-all duration-300'
              }`}>
              {tab.title}
            </button>
          ))}
        </div>

        <div className="w-full">
          {activeTab === 1 ? (
            <Offices onCountryChange={setSelectedCountry} />
          ) : (
            <ActiveComponent />
          )}
        </div>
      </div>

      <div className="info-hub w-full md:col-span-1 px-4 py-6 md:pl-16">
        <InfoHub selectedCountry={selectedCountry} />
      </div>
    </section>
  );
};

export default ContactMethods;

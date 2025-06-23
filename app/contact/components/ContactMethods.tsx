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

  const ActiveComponent = tabs[activeTab].component;

  return (
    <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="tabs w-full md:col-span-2 flex flex-col gap-4">
        <div className="tab-buttons w-full px-6 flex gap-2 border-b border-black border-opacity-25">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-2 text-lg font-medium rounded-t-lg transition-all duration-300 
                ${
                  activeTab === index
                    ? 'text-dark-blue opacity-100 border border-light-blue bg-dark-blue/30'
                    : 'text-foreground opacity-75 border-b-2 border-transparent bg-dark-blue/10 hover:text-dark-blue hover:border-light-blue hover:bg-dark-blue/20 cursor-pointer'
                }`}>
              {tab.title}
            </button>
          ))}
        </div>

        <div className="w-full">
          <ActiveComponent />
        </div>
      </div>

      <div className="info-hub w-full md:col-span-1 px-4 py-6 md:pl-16">
        <InfoHub />
      </div>
    </section>
  );
};

export default ContactMethods;

import React from 'react';
import { Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

const InfoHub = () => {
  const phones = {
    Kenya: {
      mobile: ['+254-734026409', '+254-718896167', '+254-724562063'],
      tel: ['+254-20-3746897', '+254-20-3746669'],
    },
    Ethiopia: {
      mobile: [],
      tel: ['+251 97 807 7800'],
    },
    Tanzania: {
      mobile: [],
      tel: [],
    },
  };

  const emails = [
    { email: 'info@broadcom.co.ke', description: 'For General Enquiries' },
    { email: 'sales@broadcom.co.ke', description: 'For Sales Enquiries' },
  ];

  const socials = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/broadcom.co.ke',
      icon: Facebook,
    },
    {
      name: 'Twitter / X',
      url: 'https://twitter.com/Broadband_Kenya',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/broadband-communication-networks-ltd/',
      icon: Linkedin,
    },
  ];

  return (
    <div className="w-full bg-[#ffffff] text-[#202020]">
      {/* Phone Numbers Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-light-blue mb-2">
          <Phone className="w-5 h-5 stroke-dark-blue" />
          <h3 className="font-light">Contact Numbers</h3>
        </div>

        {Object.entries(phones).map(([country, numbers]) => (
          <div key={country} className="ml-7 mb-4">
            <h4 className="font-medium text-dark-blue mb-2">{country}</h4>
            {numbers.tel.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Office:</p>
                {numbers.tel.map((phone, index) => (
                  <p
                    key={index}
                    className="hover:text-[#6610f2] cursor-pointer text-sm">
                    {phone}
                  </p>
                ))}
              </div>
            )}
            {numbers.mobile.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Mobile:</p>
                {numbers.mobile.map((phone, index) => (
                  <p
                    key={index}
                    className="hover:text-[#6610f2] cursor-pointer text-sm">
                    {phone}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Email Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-light-blue mb-2">
          <Mail className="w-5 h-5 stroke-dark-blue" />
          <h3 className="font-light">Email</h3>
        </div>
        {emails.map((item, index) => (
          <div key={index} className="ml-7 mb-2">
            <Link
              href={`mailto:${item.email}`}
              className="hover:text-[#6610f2]">
              {item.email}
            </Link>
            <p className="text-[#292929] text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-light-blue mb-2">Connect With Us</h3>
        <div className="flex flex-col gap-2 ml-7">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-light-blue transition-colors">
                <Icon className="w-5 h-5" />
                <span>{social.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoHub;

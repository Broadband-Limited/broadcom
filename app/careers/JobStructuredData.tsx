import React from 'react';

interface JobStructuredDataProps {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType: string;
  jobLocation: string;
  hiringOrganization: string;
  baseSalary?: {
    min: number;
    max: number;
    currency: string;
  };
}

const JobStructuredData: React.FC<JobStructuredDataProps> = ({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  jobLocation,
  hiringOrganization,
  baseSalary,
}) => {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough: validThrough || '',
    employmentType,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocation,
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganization,
      sameAs: 'https://www.broadcom.com',
    },
    ...(baseSalary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: baseSalary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: baseSalary.min,
          maxValue: baseSalary.max,
          unitText: 'YEAR',
        },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JobStructuredData;

export interface FaqItem {
  question: string
  answer: string
  keywords: string[]
}

export interface FaqCategory {
  [category: string]: FaqItem[]
}

export const faqData: FaqCategory = {
  'General Inquiries': [
    {
      question:
        'What services does Broadband Communication Networks Ltd offer?',
      answer:
        'Broadband Communication Networks Ltd offers comprehensive network solutions through key divisions including Network Implementation, Solutions Division, and Managed Services.',
      keywords: ['services', 'offerings', 'solutions', 'network'],
    },
    {
      question:
        'How can I contact Broadband Communication Networks Ltd for support?',
      answer:
        "You can reach us through multiple channels. For immediate assistance, please click the 'Form' tab above to submit a support request.",
      keywords: ['contact', 'support', 'help', 'reach'],
    },
    {
      question:
        "Where are Broadband Communication Networks Ltd's offices located?",
      answer:
        "To view our office locations, please click the 'Offices' tab above to access our interactive map.",
      keywords: ['location', 'offices', 'address'],
    },
  ],
  'Technical Support': [
    {
      question: 'How do I request technical support for my network?',
      answer:
        'To request technical support, submit a ticket through our support portal or contact our 24/7 technical support team.',
      keywords: ['technical', 'support', 'network', 'help'],
    },
    {
      question: 'What should I do if I encounter a network outage?',
      answer:
        'In case of a network outage, first check our network status page for any known issues. For emergency support, contact our technical team immediately.',
      keywords: ['outage', 'network', 'emergency', 'down'],
    },
    {
      question:
        'Which tools does Broadband Communication Networks Ltd use for network optimization?',
      answer:
        "We utilize industry-leading tools including VIAVI's test solutions for comprehensive network optimization and monitoring.",
      keywords: ['tools', 'optimization', 'network', 'monitoring'],
    },
  ],
  'Billing & Payments': [
    {
      question:
        'What payment methods does Broadband Communication Networks Ltd accept?',
      answer:
        'We accept major credit cards and bank transfers. For detailed billing information, please contact our billing department.',
      keywords: ['payment', 'billing', 'credit card', 'bank transfer'],
    },
    {
      question: 'How do I access my billing information or make a payment?',
      answer:
        'Access your billing information through our secure client portal. For assistance, contact our billing department.',
      keywords: ['billing', 'payment', 'portal', 'access'],
    },
  ],
}
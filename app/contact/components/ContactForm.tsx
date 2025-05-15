'use client';

import Input from '@/shared/components/ui/Input';
import React, { useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    inquiryType: '',
    subject: '',
    message: '',
    companyName: '',
    role: '',
    industry: '',
    responseTime: 'within24',
    bestTimeToReach: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: { [key: string]: string } = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (stepNumber === 2) {
      if (!formData.inquiryType)
        newErrors.inquiryType = 'Please select an inquiry type';
      if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
      if (!formData.message.trim()) newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(step)) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        // Submit form
        setIsSubmitted(true);
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
      }
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {['Personal Details', 'Inquiry', 'Company Info', 'Preferences'].map(
          (label, index) => (
            <div
              key={label}
              className={`flex-1 text-center text-sm ${
                index + 1 === step
                  ? 'text-cyan font-medium'
                  : index + 1 < step
                  ? 'text-green-600'
                  : 'text-slate-400'
              }`}>
              {label}
            </div>
          )
        )}
      </div>
      <div className="h-2 bg-slate-200 rounded-full">
        <div
          className="h-full bg-cyan rounded-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="w-full p-6 bg-background shadow-2xl">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            Thank You for Contacting Us!
          </h2>
          <p className="text-slate-600 mb-4">
            We&apos;ve received your message and will get back to you within 24
            hours.
          </p>
          <p className="text-sm bg-slate-50 p-4 rounded">
            Your reference number:{' '}
            <span className="font-mono font-medium">
              BRD-{Date.now().toString(36).toUpperCase()}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-background shadow-2xl">
      <h4 className="font-medium mb-3">
        Contact Broadband Communication Networks Ltd
      </h4>

      <hr className='mb-3 opacity-30' />

      {renderProgressBar()}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <Input
              type="text"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={errors.fullName}
            />

            <Input
              type="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              error={errors.email}
            />

            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <Input
              type="text"
              name="preferredContact"
              label="Preferred Contact Method"
              value={formData.preferredContact}
              onChange={handleChange}
              rightElement={
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) => handleChange(e)}
                  className="p-1 my-2 border text-sm">
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              }
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input
              type="text"
              name="inquiryType"
              label="Inquiry Type"
              value={formData.inquiryType}
              required
              error={errors.inquiryType}
              rightElement={
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={(e) => handleChange(e)}
                  className="p-2 border rounded">
                  <option value="">Select an inquiry type</option>
                  <option value="technical">Technical Support</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="network">Network Solutions</option>
                  <option value="managed">Managed Services</option>
                  <option value="billing">Billing</option>
                  <option value="general">General Inquiry</option>
                </select>
              }
            />

            <Input
              type="text"
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject of your inquiry"
              required
              error={errors.subject}
            />

            <Input
              type="textarea"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide details about your inquiry"
              required
              error={errors.message}
              rows={4}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input
              type="text"
              name="companyName"
              label="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
            />

            <Input
              type="text"
              name="role"
              label="Role"
              value={formData.role}
              rightElement={
                <select
                  name="role"
                  value={formData.role}
                  onChange={(e) => handleChange(e)}
                  className="p-2 border rounded">
                  <option value="">Select your role</option>
                  <option value="it_manager">IT Manager</option>
                  <option value="purchasing">Purchasing Manager</option>
                  <option value="executive">Executive</option>
                  <option value="other">Other</option>
                </select>
              }
            />

            <Input
              type="text"
              name="industry"
              label="Industry"
              value={formData.industry}
              rightElement={
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange(e)}
                  className="p-2 border rounded">
                  <option value="">Select your industry</option>
                  <option value="telecom">Telecommunications</option>
                  <option value="finance">Finance</option>
                  <option value="energy">Energy</option>
                  <option value="other">Other</option>
                </select>
              }
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Input
              type="text"
              name="responseTime"
              label="Preferred Response Time"
              value={formData.responseTime}
              rightElement={
                <select
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={(e) => handleChange(e)}
                  className="p-2 border rounded">
                  <option value="asap">As soon as possible</option>
                  <option value="within24">Within 24 hours</option>
                  <option value="within72">Within 2-3 days</option>
                </select>
              }
            />

            <Input
              type="text"
              name="bestTimeToReach"
              label="Best Time to Reach You"
              value={formData.bestTimeToReach}
              rightElement={
                <select
                  name="bestTimeToReach"
                  value={formData.bestTimeToReach}
                  onChange={(e) => handleChange(e)}
                  className="p-2 border rounded">
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              }
            />
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-cyan hover:text-indigo font-medium">
              Back
            </button>
          )}
          <button
            type="submit"
            className={`ml-auto px-6 py-2 ${
              step === 4 ? 'bg-indigo' : 'bg-light-blue'
            } text-background hover:bg-indigo focus:ring-2 focus:ring-indigo focus:ring-offset-2 flex items-center`}>
            {step === 4 ? 'Submit' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

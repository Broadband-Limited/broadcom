export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  posted_at: string;
  salary_min?: number;
  salary_max?: number;
  employment_type: EmploymentType;
  is_remote: boolean;
  requirements: string[];
  benefits?: string[];
  application_deadline?: string;
  experience_level?: ExperienceLevel;
}

export type EmploymentType =
  | 'full-time'
  | 'part-time'
  | 'contract'
  | 'internship';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';
export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  job_id: string;
  name: string;
  email: string;
  phone?: string;
  resume: string; // URL to the resume file
  cover_letter: string; // URL to the cover letter file
  linkedin_url?: string;
  portfolio_url?: string;
  referral_source?: string;
  skills?: string[];
  notes?: string;
  status: ApplicationStatus;
  applied_at: string;
}

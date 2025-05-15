export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  posted_at: string;
}

export type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface Application{
  id: string;
  job_id: string;
  name: string;
  email: string;
  resume: string; // URL to the resume file
  cover_letter: string; // URL to the cover letter file
  status: ApplicationStatus;
  applied_at: string;
}
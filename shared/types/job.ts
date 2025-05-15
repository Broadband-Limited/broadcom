export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  posted_at: string; // ISO date string
  trending?: boolean;
}

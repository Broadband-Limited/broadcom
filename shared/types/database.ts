import type { Job } from './job';

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id' | 'posted_at'> &
          Partial<Pick<Job, 'id' | 'posted_at'>>;
        Update: Partial<Omit<Job, 'id' | 'posted_at'>> &
          Partial<Pick<Job, 'id' | 'posted_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

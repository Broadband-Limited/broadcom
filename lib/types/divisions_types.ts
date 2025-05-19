export interface Division {
  id?: string;
  name: string;
  slug: string;
  description: string;
}

export interface Service {
  id?: string;
  division_id: string;
  title: string;
  slug: string;
  description: string;
  details: string[];
  image: string;
}

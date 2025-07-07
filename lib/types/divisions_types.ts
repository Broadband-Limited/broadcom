export interface Division {
  id?: string;
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  division_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id?: string;
  division_id: string;
  category_id?: string;
  title: string;
  slug: string;
  description: string;
  details: string[];
  images: string[];
}

// Extended Service interface for when we include relations
export interface ServiceWithRelations extends Service {
  divisions?: Division;
  categories?: Category;
}

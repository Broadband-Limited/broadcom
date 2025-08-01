export type MediaAttachment = {
  url: string;
  name: string; // Original filename
  displayName: string; // User-defined display name
  size?: number;
};

export type Media = {
  id: string;
  title: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  summary?: string;
  featured_image?: string;
  attachments?: MediaAttachment[];
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
};

export type MediaListItem = Pick<
  Media,
  | 'id'
  | 'title'
  | 'slug'
  | 'summary'
  | 'featured_image'
  | 'published'
  | 'published_at'
>;

import { Metadata } from 'next';
import OurStory from './components/OurStory';

export const metadata: Metadata = {
  title: 'Our Story | Broadband Communication Networks Ltd',
  description: 'The history and journey of Broadband Communication Networks Ltd since 2001.',
};

export default function OurStoryPage() {
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      <OurStory />
    </main>
  );
}

import { Metadata } from 'next';
import OurStory from './components/OurStory';

export const metadata: Metadata = {
  title: 'Our Story | Broadband Communication Networks Ltd',
  description: 'The history and journey of Broadband Communication Networks Ltd since 2001.',
};

export default function OurStoryPage() {
  return (
    <>
      <OurStory />
    </>
  );
}

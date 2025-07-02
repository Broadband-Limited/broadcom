import { redirect } from 'next/navigation';

// Redirect to the main about page since the team section is part of it
export default function TeamPage() {
  redirect('/about');
}

import { ResetPasswordForm } from './components/ResetPasswordForm';
import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ResetPasswordPage() {
  // Check if user has a valid session for password reset
  const supabase = await createServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/auth/forgot-password?status=session-expired');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <ResetPasswordForm />
    </main>
  );
}
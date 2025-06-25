'use server';

import { redirect } from 'next/navigation';
import { createServer, createServiceRoleServer } from '@/lib/supabase/server';
import { addUserRole } from '@/lib/db/user';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('>>>> could not authenticate user: ', error.message);
    redirect('/error');
  }

  redirect('/admin');
}

export async function signup(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    console.error('>>>> missing email or password');
    redirect('/auth/check-email?status=error');
  }

  // 1) sign up the user
  const supabase = await createServer();
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !data?.user?.id) {
    console.error('>>>> signup failed:', signUpError);
    redirect('/auth/check-email?status=error');
  }

  // 2) assign the “user” role
  try {
    await addUserRole(await createServiceRoleServer(), data.user.id, 'user');
  } catch (assignError) {
    // optionally: delete the user you just created to avoid orphans
    console.error('>>>> role assignment failed:', assignError);
    redirect('/auth/check-email?status=error');
  }

  // 3) on success, point them to “check your email”
  redirect('/auth/check-email?status=success');
}

export async function signOut(): Promise<void> {
  try {
    const supabase = await createServer();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('>>>> sign out failed:', error.message);
      // Still redirect even if there's an error to clear client state
    }
  } catch (error) {
    console.error('>>>> unexpected error during sign out:', error);
  } finally {
    redirect('/');
  }
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email')?.toString();

  if (!email) {
    console.error('>>>> missing email for password reset');
    redirect('/auth/forgot-password?status=error');
  }

  const supabase = await createServer();
  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/reset-password`,
    }
  );

  if (error) {
    console.error('>>>> password reset request failed:', error.message);
    redirect('/auth/forgot-password?status=error');
  }

  redirect('/auth/forgot-password?status=success');
}

export async function resetPassword(formData: FormData) {
  const password = formData.get('password')?.toString();

  if (!password) {
    console.error('>>>> missing password for reset');
    redirect('/auth/reset-password?status=error');
  }

  const supabase = await createServer();
  
  // Check if user has a valid session (from email link)
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.error('>>>> no valid session for password reset:', userError?.message);
    redirect('/auth/forgot-password?status=session-expired');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error('>>>> password reset failed:', error.message);
    redirect('/auth/reset-password?status=error');
  }

  redirect('/auth/login?status=password-reset-success');
}

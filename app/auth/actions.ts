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
    await addUserRole((await createServiceRoleServer()), data.user.id, 'user');
  } catch (assignError) {
    // optionally: delete the user you just created to avoid orphans
    console.error('>>>> role assignment failed:', assignError);
    redirect('/auth/check-email?status=error');
  }

  // 3) on success, point them to “check your email”
  redirect('/auth/check-email?status=success');
}

export async function signOut() {
  const supabase = await createServer();
  await supabase.auth.signOut();
  redirect('/');
}

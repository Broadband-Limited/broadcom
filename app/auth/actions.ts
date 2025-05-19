'use server';

import { redirect } from 'next/navigation';
import { createServer } from '@/lib/supabase/server';

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
  const supabase = await createServer();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error('>>>> could not sign up user: ', error.message);
    redirect('/error');
  }

  redirect('/admin');
}

export async function signOut() {
  const supabase = await createServer();
  await supabase.auth.signOut();
  redirect('/');
}

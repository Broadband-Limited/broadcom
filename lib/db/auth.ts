'use server';

import { createServer } from '../supabase/server';

// helper function to get the user's role from the database
export async function getUserRole() {
  const supabase = await createServer();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return null;
  }
  if (!user) {
    console.error('No user found');
    return null;
  }

  const userId = user.user.id;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }

  return data?.role;
}

export async function isAuthorised(roles: string[]) {
  const userRole = await getUserRole();
  if (!userRole) return false;

  return roles.includes(userRole);
}

export async function isAuthenticated() {
  const supabase = await createServer();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return false;
  }
  if (!user) {
    console.error('No user found');
    return false;
  }

  return true;
}
import { SupabaseClient } from '@supabase/supabase-js'

export type UserRole = { user_id: string; role: 'user' | 'admin'; };

/**
 * Inserts a row into user_roles. Throws on failure.
 */
export async function addUserRole(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, "public", any>,
  userId: string,
  role: 'user' | 'admin' = 'user'
): Promise<void> {
  const { error } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role });

  if (error) {
    console.error('❌ failed to assign role:', error);
    throw new Error('could not assign user role');
  }
}

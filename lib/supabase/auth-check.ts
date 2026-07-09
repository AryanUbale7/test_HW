import { createClient } from '@/lib/supabase/server';
import { User } from '@supabase/supabase-js';

/**
 * Server-side security check that verifies if the current request is authenticated.
 * Throws an error if the user is not logged in.
 * Use at the start of all admin-only server actions and API routes.
 */
export async function verifyAdminSession(): Promise<User> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized access. Session invalid or expired.');
  }

  return user;
}

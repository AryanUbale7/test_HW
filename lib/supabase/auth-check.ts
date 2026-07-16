import { cookies } from 'next/headers';
import { verifySession } from '@/lib/session';

/**
 * Server-side security check that verifies if the current request is authenticated.
 * Throws an error if the user is not logged in.
 * Use at the start of all admin-only server actions and API routes.
 */
export async function verifyAdminSession(): Promise<{ email: string; id: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const secret = process.env.SESSION_SECRET || 'fallback-secret-key-12345';

  if (!token) {
    throw new Error('Unauthorized access. Session invalid or expired.');
  }

  const payload = await verifySession(token, secret);
  if (!payload || !payload.email) {
    throw new Error('Unauthorized access. Session invalid or expired.');
  }

  return {
    email: payload.email,
    id: payload.id || 'admin-id',
  };
}

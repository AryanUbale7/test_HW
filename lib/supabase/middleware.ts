import { NextResponse, type NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute || isLoginRoute) {
    const token = request.cookies.get('admin_session')?.value;
    const secret = process.env.SESSION_SECRET || 'fallback-secret-key-12345';
    const user = token ? await verifySession(token, secret) : null;

    if (isAdminRoute && !isLoginRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    // Redirect logged-in users away from the login page
    if (isLoginRoute && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

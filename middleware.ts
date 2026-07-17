import { NextResponse, NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. Canonical Redirect: www.honworth.in to honworth.in
  if (host === 'www.honworth.in') {
    return NextResponse.redirect(`https://honworth.in${pathname}${url.search}`, 308);
  }

  // 2. Determine if it is the admin subdomain (e.g. admin.honworth.in or admin.localhost:3000)
  const isAdminSubdomain = host === 'admin.honworth.in' || host.startsWith('admin.');

  if (isAdminSubdomain) {
    // If they access the root subdomain (admin.honworth.in/), redirect to dashboard or login
    if (pathname === '/') {
      const token = request.cookies.get('admin_session')?.value;
      const secret = process.env.SESSION_SECRET || 'fallback-secret-key-12345';
      const user = token ? await verifySession(token, secret) : null;

      const redirectUrl = request.nextUrl.clone();
      if (user) {
        redirectUrl.pathname = '/admin/dashboard';
      } else {
        redirectUrl.pathname = '/admin/login';
      }
      return NextResponse.redirect(redirectUrl);
    }

    // Protect /admin routes on the subdomain
    if (pathname.startsWith('/admin')) {
      const token = request.cookies.get('admin_session')?.value;
      const secret = process.env.SESSION_SECRET || 'fallback-secret-key-12345';
      const user = token ? await verifySession(token, secret) : null;

      const isLoginRoute = pathname === '/admin/login';

      if (!user && !isLoginRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        return NextResponse.redirect(redirectUrl);
      }

      if (user && isLoginRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/admin/dashboard';
        return NextResponse.redirect(redirectUrl);
      }
    }
  } else {
    // Main domain: honworth.in
    // If they try to access /admin paths on the main domain, redirect them to the subdomain
    if (pathname.startsWith('/admin')) {
      const adminHost = host.includes('localhost') ? 'admin.localhost:3000' : 'admin.honworth.in';
      return NextResponse.redirect(`https://${adminHost}${pathname}${url.search}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo/ (or other static asset folders)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|txt|xml|pdf)).*)',
  ],
};

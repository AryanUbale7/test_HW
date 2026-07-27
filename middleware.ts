import { NextResponse, NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';
import { getSessionSecret } from '@/lib/env';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;

  // 1. Canonical Redirects: www.honworth.in, honworth.com, and www.honworth.com to honworth.in
  if (host === 'www.honworth.in' || host === 'honworth.com' || host === 'www.honworth.com') {
    return NextResponse.redirect(`https://honworth.in${pathname}${url.search}`, 308);
  }

  // 2. Redirect admin subdomain requests to canonical main domain admin path
  const isAdminSubdomain = host === 'admin.honworth.in' || host.startsWith('admin.');
  const secret = getSessionSecret();

  if (isAdminSubdomain) {
    const targetPath = pathname.startsWith('/admin') ? pathname : (pathname === '/' ? '/admin/login' : `/admin${pathname}`);
    return NextResponse.redirect(`https://honworth.in${targetPath}${url.search}`, 307);
  }

  // Protect /admin routes on main domain
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
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

    return NextResponse.next();
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


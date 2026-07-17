import { NextResponse, NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;
  const isRewritten = url.searchParams.get('rewritten') === 'true';

  // 1. Canonical Redirect: www.honworth.in to honworth.in
  if (host === 'www.honworth.in') {
    return NextResponse.redirect(`https://honworth.in${pathname}${url.search}`, 308);
  }

  // 2. Determine if it is the admin subdomain (e.g. admin.honworth.in or admin.localhost:3000)
  const isAdminSubdomain = host === 'admin.honworth.in' || host.startsWith('admin.');

  if (isAdminSubdomain) {
    // If it's an admin path and NOT internally rewritten, redirect to clean subdomain URL
    if (pathname.startsWith('/admin') && !isRewritten) {
      const cleanPath = pathname.replace(/^\/admin/, '') || '/';
      return NextResponse.redirect(`https://${host}${cleanPath}${url.search}`);
    }

    // Authenticate session for the admin subdomain
    const token = request.cookies.get('admin_session')?.value;
    const secret = process.env.SESSION_SECRET || 'fallback-secret-key-12345';
    const user = token ? await verifySession(token, secret) : null;

    const isLoginPage = pathname === '/login' || pathname === '/';

    if (!user && !isLoginPage && !isRewritten) {
      // Not logged in, redirect to login page (subdomain root)
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    }

    if (user && isLoginPage && !isRewritten) {
      // Logged in, redirect to dashboard
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/dashboard';
      return NextResponse.redirect(redirectUrl);
    }

    // Rewrite internally: E.g., admin.honworth.in/dashboard -> /admin/dashboard
    if (!isRewritten) {
      const targetPath = pathname === '/' ? '/admin' : `/admin${pathname}`;
      const rewriteUrl = new URL(targetPath, request.url);
      rewriteUrl.searchParams.set('rewritten', 'true');
      return NextResponse.rewrite(rewriteUrl);
    }
  } else {
    // Main domain: honworth.in
    // If trying to access /admin paths on main domain, redirect to subdomain
    if (pathname.startsWith('/admin') && !isRewritten) {
      const cleanPath = pathname.replace(/^\/admin/, '') || '/';
      const adminHost = host.includes('localhost') ? 'admin.localhost:3000' : 'admin.honworth.in';
      return NextResponse.redirect(`https://${adminHost}${cleanPath}${url.search}`);
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

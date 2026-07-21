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

  // 2. Redirect admin subdomain requests to canonical main domain admin path
  const isAdminSubdomain = host === 'admin.honworth.in' || host.startsWith('admin.');
  const secret = process.env.SESSION_SECRET || 'honworth_secure_admin_session_secret_key_2026_prod';

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

    // 3. Coming Soon Mode: Block public site access when site_mode = coming_soon
    const isExcludedPath = 
      pathname === '/coming-soon' ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/admin') ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname === '/favicon.ico' ||
      pathname === '/icon.png';

    if (!isExcludedPath) {
      try {
        const protocol = request.headers.get('x-forwarded-proto') || 'https';
        const apiUrl = `${protocol}://${host}/api/site-settings`;
        const settingsRes = await fetch(apiUrl, { cache: 'no-store' });
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          if (settings.siteMode === 'coming_soon') {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/coming-soon';
            return NextResponse.redirect(redirectUrl);
          }
        }
      } catch {
        // On error, let the request through (fail open)
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


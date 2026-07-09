import { NextResponse, NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Redirect www.honworth.in to honworth.in (canonical consistency)
  if (host === 'www.honworth.in') {
    return NextResponse.redirect(`https://honworth.in${url.pathname}${url.search}`, 308);
  }

  // Matches admin.honworth.in, studio.honworth.in, or local admin.localhost:3000
  const isAdminSubdomain = host.startsWith('admin.') || host.startsWith('studio.');

  // Temporary: also allow direct /admin access on vercel.app preview URLs and localhost
  // until custom domain honworth.in is connected to Vercel.
  // Remove this once admin.honworth.in is live.
  const isVercelPreview = host.includes('.vercel.app') || host.startsWith('localhost');

  // 1. Block access to "/admin" paths on the main production domain only (return 404)
  if (!isAdminSubdomain && !isVercelPreview && url.pathname.startsWith('/admin')) {
    return new NextResponse('Page Not Found', { status: 404 });
  }

  // 2. Handle subdomain routing
  if (isAdminSubdomain) {
    // Rewrite path internally by prepending /admin
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname}`;
    }

    // Construct a new NextRequest with the rewritten URL so Supabase middleware can run
    const rewrittenRequest = new NextRequest(url, request);
    const supabaseResponse = await updateSession(rewrittenRequest);

    // If Supabase issues a redirect, check if it contains the "/admin" prefix
    if (supabaseResponse.status === 307 || supabaseResponse.status === 302) {
      const redirectUrl = new URL(supabaseResponse.headers.get('location') || '', url.origin);
      // Strip "/admin" prefix so the browser address bar remains clean (e.g. admin.honworth.in/login)
      if (redirectUrl.pathname.startsWith('/admin')) {
        redirectUrl.pathname = redirectUrl.pathname.replace(/^\/admin/, '');
      }
      
      const redirectResponse = NextResponse.redirect(redirectUrl);
      // Copy Supabase cookies to redirect response
      supabaseResponse.headers.forEach((value, key) => {
        redirectResponse.headers.set(key, value);
      });
      return redirectResponse;
    }

    // Rewrite internally to the admin route and forward Supabase headers/cookies
    const response = NextResponse.rewrite(url);
    supabaseResponse.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // 3. Regular path on the main domain (run Supabase session updates)
  return await updateSession(request);
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

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is protected
  const isProtectedRoute = pathname.startsWith('/dashboard') ||
                          pathname.startsWith('/leads') ||
                          pathname.startsWith('/properties') ||
                          pathname.startsWith('/calendar') ||
                          pathname.startsWith('/tasks') ||
                          pathname.startsWith('/messaging') ||
                          pathname.startsWith('/broker') ||
                          pathname.startsWith('/settings');

  const isAuthRoute = pathname.startsWith('/login') ||
                     pathname.startsWith('/signup') ||
                     pathname.startsWith('/forgot-password');

  // Get Supabase auth tokens from cookies
  const accessToken = request.cookies.get('sb-access-token');
  const refreshToken = request.cookies.get('sb-refresh-token');

  // If accessing protected route without tokens, redirect to login
  if (isProtectedRoute && (!accessToken || !refreshToken)) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // If accessing auth route with tokens, redirect to dashboard
  if (isAuthRoute && accessToken && refreshToken) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all static files, images, etc.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
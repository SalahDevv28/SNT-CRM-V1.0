import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

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

  // Create Supabase client to check session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value) => {
          request.cookies.set(name, value);
        },
        remove: (name) => {
          request.cookies.delete(name);
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // If accessing protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // If accessing auth route with session, redirect to dashboard
  if (isAuthRoute && session) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!token || !refreshToken) {
    if (!request.nextUrl.pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Here you can add additional validation if needed, e.g., checking token expiry
  // However, note that JWT decoding and validation logic are typically done in the server/api

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/planner/:path*'],
};
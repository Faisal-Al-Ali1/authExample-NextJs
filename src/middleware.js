import { NextResponse } from 'next/server';

export function middleware(request) {

  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  if (url.pathname.startsWith('/protected') && !token) {
    return NextResponse.redirect(new URL('/login', url));
  }

  return NextResponse.next();
}


import { NextResponse } from 'next/server'

export function middleware(request) {
  // Do NOT block Firebase-authenticated routes here
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/orders/:path*',
    '/account/:path*',
    '/admin/:path*',
    '/auth/login',
    '/auth/signup'
  ]
}

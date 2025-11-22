import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Redirect www to non-www
  if (hostname && hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace('www.', '')
    const url = request.nextUrl.clone()
    
    // Reconstruct URL without www
    const protocol = request.nextUrl.protocol || 'https:'
    const newUrl = new URL(
      `${protocol}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`
    )
    
    return NextResponse.redirect(newUrl, 301) // Permanent redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
}


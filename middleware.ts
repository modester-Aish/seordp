import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToolProductRedirect } from '@/lib/tool-product-redirects'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Strip trailing slash — URLs like https://seordp.net/ahrefs-group-buy (no / at end)
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  // Redirect www to non-www
  if (hostname && hostname.startsWith('www.')) {
    const nonWwwHost = hostname.replace('www.', '')
    const url = request.nextUrl.clone()
    
    // Reconstruct URL without www
    const protocol = request.nextUrl.protocol || 'https:'
    const newUrl = new URL(
      `${protocol}//${nonWwwHost}${pathname}${request.nextUrl.search}`
    )
    
    return NextResponse.redirect(newUrl, 301) // Permanent redirect
  }

  // Tool-to-Product Redirects
  // Check if the path is a tool slug that should redirect to a product slug
  // Only check root-level paths (not /products/, /blog/, /pages/, etc.)
  const excludedPaths = ['/products', '/blog', '/pages', '/api', '/_next', '/favicon.ico']
  const isExcluded = excludedPaths.some(path => pathname === path || pathname.startsWith(path + '/'))
  
  if (!isExcluded && pathname && pathname.startsWith('/') && pathname.split('/').filter(p => p).length === 1) {
    const slug = pathname.slice(1) // Remove leading /
    
    // Skip if slug is empty
    if (!slug || slug.trim() === '') {
      return NextResponse.next()
    }
    
    // Check static redirect mapping
    const productSlug = getToolProductRedirect(slug)
    if (productSlug) {
      // Tool slug matches - redirect to product slug (URL bar will show product slug)
      const url = request.nextUrl.clone()
      url.pathname = `/${productSlug}`
      return NextResponse.redirect(url, 301) // Permanent redirect - URL bar will update
    }
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


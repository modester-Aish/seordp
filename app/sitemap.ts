import { MetadataRoute } from 'next'
import { fetchAllPagesComplete } from '@/lib/wordpress-api'
import { fetchAllProductsComplete, isExcludedDuplicate } from '@/lib/woocommerce-api'
import { getAllTools } from '@/lib/tools-data'
import { matchToolToProduct } from '@/lib/tool-product-matcher'
import { getToolProductRedirect } from '@/lib/tool-product-redirects'

const SITE_URL = 'https://seordp.net'

// Revalidate sitemap every minute - automatically updates when WordPress content changes
export const revalidate = 60 // 1 minute in seconds - matches content pages

// Fetch all posts with pagination
async function fetchAllPostsComplete() {
  const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
  const WP_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`
  
  try {
    let allPosts: any[] = []
    let totalPages = 1
    let currentPage = 1

    // Fetch first page to get total pages
    const firstResponse = await fetch(`${WP_API_URL}/posts?page=1&per_page=100`, {
      next: { revalidate: 60 } // Check WordPress every minute for new posts
    })

    if (!firstResponse.ok) {
      throw new Error(`HTTP error! status: ${firstResponse.status}`)
    }

    allPosts = await firstResponse.json()
    totalPages = parseInt(firstResponse.headers.get('x-wp-totalpages') || '1')

    // Fetch remaining pages if there are more
    if (totalPages > 1) {
      const pagePromises = []
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          fetch(`${WP_API_URL}/posts?page=${page}&per_page=100`, {
            next: { revalidate: 60 } // Check WordPress every minute for new posts
          }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status}`)))
        )
      }

      const responses = await Promise.all(pagePromises)
      responses.forEach(data => {
        allPosts = [...allPosts, ...data]
      })
    }

    return allPosts
  } catch (error) {
    console.error('Error fetching all posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/single-tools-list`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Fetch WordPress pages with validation
  const { data: pages } = await fetchAllPagesComplete()
  const pageEntries: MetadataRoute.Sitemap = (pages || [])
    .filter((page) => 
      page?.slug && 
      page.slug.trim() !== '' && 
      page.status === 'publish' // Only published pages
    )
    .map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(page.modified || page.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Fetch WordPress posts with validation
  const posts = await fetchAllPostsComplete()
  const postEntries: MetadataRoute.Sitemap = (posts || [])
    .filter((post) => 
      post?.slug && 
      post.slug.trim() !== '' && 
      post.status === 'publish' // Only published posts
    )
    .map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: new Date(post.modified || post.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Fetch WooCommerce products with validation
  const { data: products } = await fetchAllProductsComplete()
  const productEntries: MetadataRoute.Sitemap = (products || [])
    .filter((product) => 
      product?.slug && 
      product.slug.trim() !== '' && 
      product.status === 'publish' &&
      !isExcludedDuplicate(product.slug) // Exclude duplicate products
    )
    .map((product) => ({
      url: `${SITE_URL}/${product.slug}`,
      lastModified: new Date(product.date_modified || product.date_created || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Fetch static tools with validation
  // IMPORTANT: Only include unmatched tools (tools that don't redirect to products)
  // Matched tools redirect to products, so their URLs shouldn't be in sitemap
  // Unmatched tools have their own detail pages, so include them
  const tools = getAllTools()
  const toolEntries: MetadataRoute.Sitemap = (tools || [])
    .filter((tool) => {
      // Filter invalid slugs
      if (!tool?.slug || tool.slug.trim() === '') return false
      
      // FIRST: Check static redirect map (fastest check)
      // If tool has a static redirect, exclude it from sitemap (it redirects to product)
      const staticRedirect = getToolProductRedirect(tool.slug)
      if (staticRedirect) {
        return false // Tool redirects to product - exclude from sitemap
      }
      
      // SECOND: Use dynamic matching as fallback (for tools not in static map)
      // If tool matches a product, exclude it from sitemap (use product URL instead)
      if (products && products.length > 0) {
        const matchedProduct = matchToolToProduct(tool, products)
        // If tool matches a product, exclude it from sitemap
        if (matchedProduct && matchedProduct.status === 'publish') {
          return false
        }
      }
      
      // Tool doesn't match any product - include it in sitemap (unmatched tool detail page)
      return true
    })
    .map((tool) => ({
      url: `${SITE_URL}/${tool.slug}`,
      lastModified: new Date(), // Static tools, use current date
      changeFrequency: 'monthly' as const,
      priority: 0.8, // Same priority as products (since they have detail pages now)
    }))

  // Combine all entries and remove duplicates
  const allEntries = [...staticPages, ...pageEntries, ...postEntries, ...productEntries, ...toolEntries]
  
  // Remove duplicate URLs (same slug can exist in multiple content types)
  const uniqueEntries = allEntries.filter((entry, index, self) =>
    index === self.findIndex((e) => e.url === entry.url)
  )

  return uniqueEntries
}

